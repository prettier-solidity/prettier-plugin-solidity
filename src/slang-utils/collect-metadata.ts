import { EdgeLabel, TerminalKind } from '@nomicfoundation/slang/cst';
import { MultiLineComment } from '../slang-nodes/MultiLineComment.ts';
import { MultiLineNatSpecComment } from '../slang-nodes/MultiLineNatSpecComment.ts';
import { SingleLineComment } from '../slang-nodes/SingleLineComment.ts';
import { SingleLineNatSpecComment } from '../slang-nodes/SingleLineNatSpecComment.ts';

import type { Cursor } from '@nomicfoundation/slang/cst';
import type { Comment } from '../slang-nodes/types.d.ts';
import type { CollectedMetadata, Location } from '../types.d.ts';

interface Metadata {
  locations: CollectedMetadata['locations'];
  comments: Comment[];
}

// Walks the children of the NonterminalNode under the cursor, recording the
// location of every node below it and collecting the comments, then records
// the NonterminalNode's own location and returns it.
//
// A single cursor walking the whole tree is much cheaper than calling
// `children()` on every NonterminalNode, since each call crosses into Slang's
// WebAssembly and creates a new JavaScript object for every child.
function visitNonterminal(
  cursor: Cursor,
  id: number,
  collected: Metadata,
  originalText: string,
  outerStart = 0
): [inner: Location, outer: Location] {
  let offset = outerStart;
  // The first and last children that aren't trivia give the node's start and
  // end without any surrounding comments or whitespace, at any depth.
  let start;
  let end;

  if (cursor.goToFirstChild()) {
    do {
      const label = cursor.label;

      // Trivia can be identified by its label, which is much cheaper than
      // instantiating the node. Since a huge amount of nodes are trivia, it's
      // worth to just query the Cursor.
      if (
        label === EdgeLabel.LeadingTrivia ||
        label === EdgeLabel.TrailingTrivia
      ) {
        const textEnd = cursor.textRange.end.utf16;

        // Whitespace and line breaks never start with `/`, every comment does.
        if (originalText.startsWith('/', offset)) {
          // Since fetching the comments and calculating offsets are both done
          // as we iterate over the tree and the comment also depends on the
          // offset, it's hard to separate these responsibilities into
          // different functions without doing the iteration twice.
          const node = cursor.node;
          switch (node.kind) {
            case TerminalKind.MultiLineComment:
              collected.comments.push(
                new MultiLineComment(node, offset, textEnd)
              );
              break;
            case TerminalKind.MultiLineNatSpecComment:
              collected.comments.push(
                new MultiLineNatSpecComment(node, offset, textEnd)
              );
              break;
            case TerminalKind.SingleLineComment:
              collected.comments.push(
                new SingleLineComment(node, offset, textEnd)
              );
              break;
            case TerminalKind.SingleLineNatSpecComment:
              collected.comments.push(
                new SingleLineNatSpecComment(node, offset, textEnd)
              );
              break;
          }
        }

        offset = textEnd;
        continue;
      }

      const node = cursor.node;

      if (node.isTerminalNode()) {
        start ??= offset;
        end = offset + node.textLength.utf16;
        // Some variants can be TerminalNodes, and since `extractVariant` drops
        // their wrapper, we need to track their location.
        collected.locations.set(node.id, [{ start: offset, end }]);
        offset = end;
        continue;
      }
      // A nonterminal ends where its last child ends, so we don't need to
      // ask Slang for its length.
      const [inner, outer] = visitNonterminal(
        cursor,
        node.id,
        collected,
        originalText,
        offset
      );
      offset = outer.end;
      // An empty node has no tokens to give its parent a start or an end.
      if (inner.start === inner.end) continue;
      start ??= inner.start;
      end = inner.end;
    } while (cursor.goToNextSibling());

    // Since we are done with the children, we move the cursor to the parent
    // node so the calling function can continue walking.
    cursor.goToParent();
  }

  // We collect the location of the NonterminalNode itself. A node without any
  // children other than trivia (an empty list) collapses to its start.
  const nodeLocations: [inner: Location, outer: Location] = [
    { start: start ?? outerStart, end: end ?? outerStart },
    { start: outerStart, end: offset }
  ];
  collected.locations.set(id, nodeLocations);

  return nodeLocations;
}

// Records the location of every node in the tree, and collects its comments,
// in a single walk. The cursor must be at the root of the tree.
export function collectMetadata(
  cursor: Cursor,
  originalText: string
): Metadata {
  const collected: Metadata = { locations: new Map(), comments: [] };
  visitNonterminal(cursor, cursor.node.id, collected, originalText);
  return collected;
}
