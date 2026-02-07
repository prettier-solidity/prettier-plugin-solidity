import {
  TerminalNode as SlangTerminalNode,
  TerminalKind,
  TerminalKindExtensions
} from '@nomicfoundation/slang/cst';
import { MultiLineComment } from './MultiLineComment.js';
import { MultiLineNatSpecComment } from './MultiLineNatSpecComment.js';
import { SingleLineComment } from './SingleLineComment.js';
import { SingleLineNatSpecComment } from './SingleLineNatSpecComment.js';

import type { NonterminalKind } from '@nomicfoundation/slang/cst';
import type {
  AstLocation,
  CollectedMetadata,
  SlangAstNode
} from '../types.d.ts';
import type { Comment, StrictAstNode } from './types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

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

export abstract class SlangNode {
  abstract readonly kind: TerminalKind | NonterminalKind;

  comments?: Comment[];

  loc: AstLocation;

  constructor(
    ast: SlangAstNode | SlangTerminalNode,
    collected: CollectedMetadata,
    enclosePeripheralComments = false
  ) {
    if (ast instanceof SlangTerminalNode) {
      const start = collected.offsets.get(ast.id) || 0;
      const end = start + ast.textLength.utf16;
      this.loc = {
        outerStart: start,
        outerEnd: end,
        start,
        end
      };
      return;
    }
    const cst = ast.cst;

    const initialOffset = collected.offsets.get(cst.id) || 0;
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
        collected.offsets.set(node.id, offset);
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
            collected.comments.push(new MultiLineComment(node, offset));
            break;
          case TerminalKind.MultiLineNatSpecComment:
            collected.comments.push(new MultiLineNatSpecComment(node, offset));
            break;
          case TerminalKind.SingleLineComment:
            collected.comments.push(new SingleLineComment(node, offset));
            break;
          case TerminalKind.SingleLineNatSpecComment:
            collected.comments.push(new SingleLineNatSpecComment(node, offset));
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
      outerStart: initialOffset,
      outerEnd: offset,
      start: initialOffset + leadingOffset,
      end: offset - trailingOffset
    };
  }

  updateMetadata(
    ...childNodes: (StrictAstNode | TerminalNode | undefined)[]
  ): void {
    const { loc } = this;
    // calculate correct loc object
    if (loc.outerStart === loc.start) {
      for (const childNode of childNodes) {
        if (childNode === undefined) continue;
        const { outerStart, start } = childNode.loc;

        if (outerStart === loc.start) {
          loc.start = start;
          break;
        }
      }
    }

    if (loc.outerEnd === loc.end) {
      for (const childNode of reversedIterator(childNodes)) {
        if (childNode === undefined) continue;
        const { outerEnd, end } = childNode.loc;

        if (outerEnd === loc.end) {
          loc.end = end;
          break;
        }
      }
    }
    this.loc = loc;
  }
}
