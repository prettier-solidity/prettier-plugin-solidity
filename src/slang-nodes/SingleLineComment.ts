import { TerminalKind } from '@nomicfoundation/slang/cst';
import { CommentNode } from './CommentNode.ts';

import type { Doc } from 'prettier';

export class SingleLineComment extends CommentNode {
  readonly kind = TerminalKind.SingleLineComment;

  constructor(originalText: string, start: number, end: number) {
    super(originalText, start, end);
  }

  print(): Doc {
    return this.value.trimEnd();
  }
}
