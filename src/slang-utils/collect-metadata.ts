import {
  TerminalKind,
  TerminalKindExtensions
} from '@nomicfoundation/slang/cst';
import { MultiLineComment } from '../slang-nodes/MultiLineComment.ts';
import { MultiLineNatSpecComment } from '../slang-nodes/MultiLineNatSpecComment.ts';
import { SingleLineComment } from '../slang-nodes/SingleLineComment.ts';
import { SingleLineNatSpecComment } from '../slang-nodes/SingleLineNatSpecComment.ts';

import type { Cursor } from '@nomicfoundation/slang/cst';
import type { CollectedMetadata } from '../types.d.ts';

type Metadata = Pick<CollectedMetadata, 'locations' | 'comments'>;

// Walks the children of the NonterminalNode under the cursor, recording the
// location of every node below it and collecting the comments, then records
// the NonterminalNode's own location and returns where it ends.
//
// A single cursor walking the whole tree is much cheaper than calling
// `children()` on every NonterminalNode, since each call crosses into Slang's
// WebAssembly and creates a new JavaScript object for every child.
function visitNonterminal(
  cursor: Cursor,
  id: number,
  collected: Metadata,
  outerStart = 0
): number {
  let offset = outerStart;
  let triviaLength = 0;
  let leadingOffset;

  if (cursor.goToFirstChild()) {
    do {
      const node = cursor.node;

      if (node.isNonterminalNode()) {
        // A nonterminal ends where its last child ends, so we don't need to
        // ask Slang for its length.
        offset = visitNonterminal(cursor, node.id, collected, offset);
        // We assign the `leadingOffset` only once.
        leadingOffset ??= triviaLength;
        // Since this is a non trivia node, we reset the accumulated length
        triviaLength = 0;
        continue;
      }

      // We only care about textLength for TerminalNodes.
      // NonterminalNodes' textLength is the sum of its children's textLengths.
      const textLength = node.textLength.utf16;
      const end = offset + textLength;
      const kind = node.kind;

      if (!TerminalKindExtensions.isTrivia(kind)) {
        // Some variants can be TerminalNodes, and since `extractVariant` drops
        // their wrapper, we need to track their location.
        collected.locations.set(node.id, {
          outerStart: offset,
          outerEnd: end,
          start: offset,
          end
        });
        // We assign the `leadingOffset` only once.
        leadingOffset ??= triviaLength;
        // Since this is a non trivia node, we reset the accumulated length
        triviaLength = 0;
        offset = end;
        continue;
      }

      // Since fetching the comments and calculating offsets are both done as
      // we iterate over the tree and the comment also depends on the offset,
      // it's hard to separate these responsibilities into different functions
      // without doing the iteration twice.
      switch (kind) {
        case TerminalKind.MultiLineComment:
          collected.comments.push(new MultiLineComment(node, offset, end));
          break;
        case TerminalKind.MultiLineNatSpecComment:
          collected.comments.push(
            new MultiLineNatSpecComment(node, offset, end)
          );
          break;
        case TerminalKind.SingleLineComment:
          collected.comments.push(new SingleLineComment(node, offset, end));
          break;
        case TerminalKind.SingleLineNatSpecComment:
          collected.comments.push(
            new SingleLineNatSpecComment(node, offset, end)
          );
          break;
      }
      // We accumulate the trivia length
      triviaLength += textLength;
      offset = end;
    } while (cursor.goToNextSibling());

    // Since we are done with the children, we move the cursor to the parent
    // node so the calling function can continue walking.
    cursor.goToParent();
  }

  // In case the `leadingOffset` was not initialized
  leadingOffset ??= 0;

  // We collect the location of the NonterminalNode itself.
  collected.locations.set(id, {
    outerStart,
    outerEnd: offset,
    start: outerStart + leadingOffset,
    // The remaining `triviaLength` is the trailing trivia
    end: offset - triviaLength
  });

  // Return the outerStart plus the sum of all of the children's textLengths.
  return offset;
}

// Records the location of every node in the tree, and collects its comments,
// in a single walk. The cursor must be at the root of the tree.
export function collectMetadata(cursor: Cursor): Metadata {
  const collected: Metadata = { locations: new Map(), comments: [] };
  visitNonterminal(cursor, cursor.node.id, collected);
  return collected;
}
