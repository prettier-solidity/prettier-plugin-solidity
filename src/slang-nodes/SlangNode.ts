import {
  TerminalNode as SlangTerminalNode,
  TerminalKind,
  TerminalKindExtensions
} from '@nomicfoundation/slang/cst';
import { MultiLineComment } from './MultiLineComment.ts';
import { MultiLineNatSpecComment } from './MultiLineNatSpecComment.ts';
import { SingleLineComment } from './SingleLineComment.ts';
import { SingleLineNatSpecComment } from './SingleLineNatSpecComment.ts';

import type { NonterminalKind } from '@nomicfoundation/slang/cst';
import type {
  AstLocation,
  CollectedMetadata,
  SlangAstNode
} from '../types.d.ts';
import type { Comment, PrintableNode } from './types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

function reversedIterator<T>(children: T[]): Iterable<T> {
  return {
    [Symbol.iterator](): Iterator<T> {
      let index = children.length;
      return {
        next: function (): IteratorResult<T, undefined> {
          index--;
          return index < 0
            ? { done: true, value: undefined }
            : { done: false, value: children[index] };
        }
      };
    }
  };
}

// Every own data field of a node, excluding its methods (`print`,
// `updateMetadata`, and any node-specific ones like `getSingleExpression`).
type DataFields<T> = {
  [
    K in keyof T as T[K] extends (...args: never[]) => unknown ? never : K
  ]: T[K];
};

export abstract class SlangNode {
  abstract readonly kind: TerminalKind | NonterminalKind;

  comments?: Comment[];

  loc: AstLocation;

  protected constructor(
    ast: SlangAstNode | SlangTerminalNode,
    collected: CollectedMetadata,
    enclosePeripheralComments = false
  ) {
    if (ast instanceof SlangTerminalNode) {
      const { start, end } = collected.locations.get(ast.id) ?? {
        start: 0,
        end: ast.textLength.utf16
      };
      this.loc = {
        outerStart: start,
        outerEnd: end,
        start,
        end
      };
      return;
    }
    const cst = ast.cst;

    const initialOffset = collected.locations.get(cst.id)?.start ?? 0;
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

      if (node.isTerminalNode()) {
        const kind = node.kind;
        if (TerminalKindExtensions.isTrivia(kind)) {
          const end = offset + textLength;
          switch (kind) {
            // Since the fetching the comments and calculating offsets are both
            // done as we iterate over the children and the comment also depends
            // on the offset, it's hard to separate these responsibilities into
            // different functions without doing the iteration twice.
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
          continue;
        }
      }

      // Also tracking TerminalNodes since some variants that were not
      // Identifier or YulIdentifier but were upgraded to TerminalNode
      collected.locations.set(node.id, {
        start: offset,
        end: offset + textLength
      });
      // We assign the `leadingOffset` only once.
      leadingOffset ??= triviaLength;
      // Since this is a non trivia node, we reset the accumulated length
      triviaLength = 0;
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
    ...childNodes: (PrintableNode | TerminalNode | undefined)[]
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

  // Builds an instance with the right prototype (so `instanceof` and the
  // class's own methods work) bypassing its constructor, which expects a real
  // slang-parsed AST.
  static createSynthetic<T extends SlangNode>(
    this: (new (...args: never[]) => T) & { prototype: T },
    fields: DataFields<T>
  ): T {
    return Object.assign(Object.create(this.prototype) as T, fields);
  }
}
