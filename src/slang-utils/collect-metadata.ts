import { EdgeLabel, TerminalKind } from '@nomicfoundation/slang/cst';
import { MultiLineComment } from '../slang-nodes/MultiLineComment.ts';
import { MultiLineNatSpecComment } from '../slang-nodes/MultiLineNatSpecComment.ts';
import { SingleLineComment } from '../slang-nodes/SingleLineComment.ts';
import { SingleLineNatSpecComment } from '../slang-nodes/SingleLineNatSpecComment.ts';

import type { Cursor } from '@nomicfoundation/slang/cst';
import type { Comment } from '../slang-nodes/types.d.ts';
import type { AstLocation } from '../types.d.ts';

interface Metadata {
  locations: Map<number, AstLocation>;
  comments: Comment[];
  // How far into the text the walk is.
  offset: number;
}

// Walks the children of the NonterminalNode under the cursor, recording the
// location of every node below it and collecting the comments, then records
// and returns the NonterminalNode's own location.
//
// A single cursor walking the whole tree is much cheaper than calling
// `children()` on every NonterminalNode, since each call crosses into Slang's
// WebAssembly and creates a new JavaScript object for every child.
function visitNonterminal(
  cursor: Cursor,
  id: number,
  collected: Metadata,
  originalText: string
): AstLocation {
  // Where the node starts, including the comments before its first token.
  const outerStart = collected.offset;
  // The locations of the first and the last children that are not trivia.
  let first: AstLocation | undefined;
  let last: AstLocation | undefined;

  if (cursor.goToFirstChild()) {
    do {
      const label = cursor.label;

      // Trivia can be identified by it's label, which is much cheaper than
      // instantiating the node. Since a huge amount of nodes are trivia, it's
      // worth to just query the Cursor.
      if (
        label === EdgeLabel.LeadingTrivia ||
        label === EdgeLabel.TrailingTrivia
      ) {
        const start = collected.offset;
        const end = cursor.textRange.end.utf16;

        // Whitespace and line breaks never start with `/`, every comment does.
        if (originalText.startsWith('/', start)) {
          // Since fetching the comments and locating the nodes are both done
          // as we iterate over the tree and a comment's location also depends
          // on where the walk is, it's hard to separate these responsibilities
          // into different functions without doing the iteration twice.
          const node = cursor.node;
          switch (node.kind) {
            case TerminalKind.MultiLineComment:
              collected.comments.push(new MultiLineComment(node, start, end));
              break;
            case TerminalKind.MultiLineNatSpecComment:
              collected.comments.push(
                new MultiLineNatSpecComment(node, start, end)
              );
              break;
            case TerminalKind.SingleLineComment:
              collected.comments.push(new SingleLineComment(node, start, end));
              break;
            case TerminalKind.SingleLineNatSpecComment:
              collected.comments.push(
                new SingleLineNatSpecComment(node, start, end)
              );
              break;
          }
        }
        collected.offset = end;
        continue;
      }

      const node = cursor.node;

      if (node.isTerminalNode()) {
        const start = collected.offset;
        const end = start + node.textLength.utf16;
        last = {
          outerStart: start,
          outerEnd: end,
          start,
          end
        };
        // Some variants can be TerminalNodes, and since `extractVariant` drops
        // their wrapper, we need to track their location.
        collected.locations.set(node.id, last);
        collected.offset = end;
      } else {
        // The walk moves the offset to where the nonterminal ends, so we don't
        // need to ask Slang for its length.
        last = visitNonterminal(cursor, node.id, collected, originalText);
      }

      first ??= last;
    } while (cursor.goToNextSibling());

    // Since we are done with the children, we move the cursor to the parent
    // node so the calling function can continue walking.
    cursor.goToParent();
  }

  // We collect the location of the NonterminalNode itself.
  const location = {
    outerStart,
    outerEnd: collected.offset,
    start: first?.start ?? outerStart,
    end: last?.end ?? outerStart
  };
  collected.locations.set(id, location);

  return location;
}

// Records the location of every node in the tree, and collects its comments,
// in a single walk. The cursor must be at the root of the tree.
export function collectMetadata(
  cursor: Cursor,
  originalText: string
): Metadata {
  const collected: Metadata = { locations: new Map(), comments: [], offset: 0 };
  visitNonterminal(cursor, cursor.node.id, collected, originalText);
  return collected;
}
