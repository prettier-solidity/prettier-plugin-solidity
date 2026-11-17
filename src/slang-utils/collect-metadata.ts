import { EdgeLabel, NonterminalKind } from '@nomicfoundation/slang/cst';
import { MultiLineComment } from '../slang-nodes/MultiLineComment.ts';
import { MultiLineNatSpecComment } from '../slang-nodes/MultiLineNatSpecComment.ts';
import { SingleLineComment } from '../slang-nodes/SingleLineComment.ts';
import { SingleLineNatSpecComment } from '../slang-nodes/SingleLineNatSpecComment.ts';
import { createKindCheckFunction } from './create-kind-check-function.ts';

import type { Cursor, NonterminalNode } from '@nomicfoundation/slang/cst';
import type { Comment } from '../slang-nodes/types.d.ts';
import type { Location } from '../types.d.ts';

interface Metadata {
  locations: Map<number, Location>;
  comments: Comment[];
}

// A collection's location embraces the comments around its items, so they are
// attached within the collection (and stay inside its delimiters) instead of
// to whichever node surrounds it. These are the collections that don't, and
// are located by their first and last item like any other node.
const isTightCollection = createKindCheckFunction([
  NonterminalKind.CatchClauses,
  NonterminalKind.HexStringLiterals,
  NonterminalKind.IdentifierPath,
  NonterminalKind.StringLiterals,
  NonterminalKind.UnicodeStringLiterals,
  NonterminalKind.YulPath,
  NonterminalKind.YulPaths,
  NonterminalKind.YulSwitchCases,
  NonterminalKind.YulVariableNames
]);

// Records the location of every node in the tree, and collects its comments,
// in a single walk. The cursor must be at the root of the tree.
export function collectMetadata(
  cursor: Cursor,
  originalText: string
): Metadata {
  const root = cursor.node as NonterminalNode;
  const locations = new Map<number, Location>();
  const comments: Comment[] = [];
  let offset = 0;

  // Walks the children of the NonterminalNode under the cursor, recording the
  // location of every node below it and collecting the comments, then records
  // and returns the NonterminalNode's own location.
  //
  // A single cursor walking the whole tree is much cheaper than calling
  // `children()` on every NonterminalNode, since each call crosses into
  // Slang's WebAssembly and creates a new JavaScript object for every child.
  function visitNonterminal(node: NonterminalNode): Location {
    // Where the node starts, including the comments before its first token.
    const outerStart = offset;
    let isCollection = false;
    // The locations of the first and the last children that are not trivia.
    let first: Location | undefined;
    let last: Location | undefined;

    if (cursor.goToFirstChild()) {
      do {
        const label = cursor.label;

        // Trivia can be identified by its label, which is much cheaper than
        // instantiating the node. Since a huge amount of nodes are trivia,
        // it's worth just querying the Cursor.
        if (
          label === EdgeLabel.LeadingTrivia ||
          label === EdgeLabel.TrailingTrivia
        ) {
          const start = offset;
          const end = cursor.textRange.end.utf16;

          // Whitespace and line breaks never start with `/`, every comment
          // does.
          if (originalText.startsWith('/', start)) {
            // Since fetching the comments and locating the nodes are both done
            // as we iterate over the tree and a comment's location also
            // depends on where the walk is, it's hard to separate these
            // responsibilities into different functions without doing the
            // iteration twice.
            const commentStartsWith = (prefix: string): boolean =>
              originalText.startsWith(prefix, start);
            const CommentClass = commentStartsWith('//')
              ? commentStartsWith('///')
                ? SingleLineNatSpecComment
                : SingleLineComment
              : commentStartsWith('/**') &&
                  // `/**/` is an empty MultiLineComment.
                  !commentStartsWith('/**/')
                ? MultiLineNatSpecComment
                : MultiLineComment;
            comments.push(new CommentClass(originalText, start, end));
          }
          offset = end;
          continue;
        }

        // Only the children of a collection are labeled as items, which spares
        // us from asking Slang for the kind of every other NonterminalNode.
        if (label === EdgeLabel.Item) isCollection = true;

        const child = cursor.node;

        if (child.isTerminalNode()) {
          last = { start: offset, end: offset + child.textLength.utf16 };
          // Some variants can be TerminalNodes, and since `extractVariant`
          // drops their wrapper, we need to track their location.
          locations.set(child.id, last);
          offset = last.end;
        } else {
          // The walk moves the offset to where the nonterminal ends, so we
          // don't need to ask Slang for its length.
          last = visitNonterminal(child);
        }

        first ??= last;
      } while (cursor.goToNextSibling());

      // Since we are done with the children, we move the cursor to the parent
      // node so the calling function can continue walking.
      cursor.goToParent();
    }

    // An embracing collection covers everything the walk went through,
    // peripheral comments included.
    const embracesComments = isCollection && !isTightCollection(node);

    // Comments before a node's first token can be several levels below it, so
    // the node is located by its first and last children.
    // A node without children will default to a `start` and `end` equal to the
    // initial offset.
    const location = {
      start: embracesComments ? outerStart : (first?.start ?? outerStart),
      end: embracesComments ? offset : (last?.end ?? outerStart)
    };
    locations.set(node.id, location);

    return location;
  }

  visitNonterminal(root);
  return { locations, comments };
}
