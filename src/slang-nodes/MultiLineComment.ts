import { TerminalKind } from '@nomicfoundation/slang/cst';
import { printBlockComment } from '../slang-printers/print-block-comment.ts';
import { CommentNode } from './CommentNode.ts';

import type { TerminalNode } from '@nomicfoundation/slang/cst';
import type { Doc } from 'prettier';

export class MultiLineComment extends CommentNode {
  readonly kind = TerminalKind.MultiLineComment;

  value: string;

  constructor(ast: TerminalNode, offset: number) {
    super(ast, offset);

    this.value = ast.unparse();
  }

  print(): Doc {
    return printBlockComment(this);
  }
}
