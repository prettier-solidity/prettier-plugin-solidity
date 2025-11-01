import {
  TerminalNode as SlangTerminalNode,
  TerminalKind,
  TerminalKindExtensions
} from '@nomicfoundation/slang/cst';
import { MultiLineComment } from '../slang-nodes/MultiLineComment.js';
import { MultiLineNatSpecComment } from '../slang-nodes/MultiLineNatSpecComment.js';
import { SingleLineComment } from '../slang-nodes/SingleLineComment.js';
import { SingleLineNatSpecComment } from '../slang-nodes/SingleLineNatSpecComment.js';

import type { Comment, StrictAstNode } from '../slang-nodes/types.d.ts';
import type { AstLocation, SlangAstNode } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.js';

const offsets = new Map<number, number>();
const comments: Comment[] = [];

export function clearOffsets(): void {
  offsets.clear();
}

export function clearComments(): Comment[] {
  return comments.splice(0);
}

function reversedIterator<T>(children: T[]): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      let index = children.length;
      return {
        next: function (): IteratorResult<T, T> {
          index--;
          return { done: index < 0, value: children[index] };
        }
      };
    }
  };
}

export class SlangNode {
  comments?: Comment[];

  loc: AstLocation;

  constructor(
    ast: SlangAstNode | SlangTerminalNode,
    enclosePeripheralComments = false
  ) {
    if (ast instanceof SlangTerminalNode) {
      const offset = offsets.get(ast.id) || 0;
      this.loc = {
        start: offset,
        end: offset + ast.textLength.utf16,
        leadingOffset: 0,
        trailingOffset: 0
      };
      return;
    }
    const cst = ast.cst;

    const initialOffset = offsets.get(cst.id) || 0;
    let offset = initialOffset;
    let triviaLength = 0;
    let leadingOffset;
    let trailingOffset;

    if (enclosePeripheralComments) {
      // We initialize the offsets to 0 to avoid them being updated later.
      leadingOffset = 0;
      trailingOffset = 0;
    }

    for (const { node } of cst.children()) {
      const textLength = node.textLength.utf16;
      if (
        node.isNonterminalNode() ||
        !TerminalKindExtensions.isTrivia(node.kind)
      ) {
        // Also tracking TerminalNodes since some variants that were not
        // Identifier or YulIdentifier but were upgraded to TerminalNode
        offsets.set(node.id, offset);
        // We assign the `leadingOffset` only once.
        leadingOffset ??= triviaLength;
        // Since this is a non trivia node, we reset the accumulated length
        triviaLength = 0;
      } else {
        switch (node.kind) {
          // Since the fetching the comments and calculating offsets are both done
          // as we iterate over the children and the comment also depends on the
          // offset, it's hard to separate these responsibilities into different
          // functions without doing the iteration twice.
          case TerminalKind.MultiLineComment:
            comments.push(new MultiLineComment(node, offset));
            break;
          case TerminalKind.MultiLineNatSpecComment:
            comments.push(new MultiLineNatSpecComment(node, offset));
            break;
          case TerminalKind.SingleLineComment:
            comments.push(new SingleLineComment(node, offset));
            break;
          case TerminalKind.SingleLineNatSpecComment:
            comments.push(new SingleLineNatSpecComment(node, offset));
            break;
        }
        // We accumulate the trivia length
        triviaLength += textLength;
      }

      offset += textLength;
    }

    // In case the `leadingOffset` was not initialized
    leadingOffset ??= 0;
    // The remaining `triviaLength` is the `trailingOffset`
    trailingOffset ??= triviaLength;

    this.loc = {
      start: initialOffset + leadingOffset,
      end: offset - trailingOffset,
      leadingOffset,
      trailingOffset
    };
  }

  updateMetadata(
    ...childNodes: (StrictAstNode | TerminalNode | undefined)[]
  ): void {
    const { loc } = this;
    // calculate correct loc object
    if (loc.leadingOffset === 0) {
      for (const childNode of childNodes) {
        if (childNode === undefined) continue;
        const { leadingOffset, start } = childNode.loc;

        if (start - leadingOffset === loc.start) {
          loc.leadingOffset = leadingOffset;
          loc.start = start;
          break;
        }
      }
    }

    if (loc.trailingOffset === 0) {
      for (const childNode of reversedIterator(childNodes)) {
        if (childNode === undefined) continue;
        const { trailingOffset, end } = childNode.loc;

        if (end + trailingOffset === loc.end) {
          loc.trailingOffset = trailingOffset;
          loc.end = end;
          break;
        }
      }
    }
    this.loc = loc;
  }
}
