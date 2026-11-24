import { TerminalKind } from '@nomicfoundation/slang/cst';
import { printBlockComment } from '../slang-printers/print-block-comment.ts';
import { CommentNode } from './CommentNode.ts';

import type { Doc } from 'prettier';

export class MultiLineNatSpecComment extends CommentNode {
  readonly kind = TerminalKind.MultiLineNatSpecComment;

  constructor(originalText: string, start: number, end: number) {
    super(originalText, start, end);
  }

  print(): Doc {
    return printBlockComment(this);
  }
}
