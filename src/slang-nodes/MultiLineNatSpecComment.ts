import { TerminalKind } from '@nomicfoundation/slang/cst';
import { printBlockComment } from '../slang-printers/print-block-comment.js';
import { CommentNode } from './CommentNode.js';

import type { TerminalNode } from '@nomicfoundation/slang/cst';
import type { Doc } from 'prettier';

export class MultiLineNatSpecComment extends CommentNode {
  readonly kind = TerminalKind.MultiLineNatSpecComment;

  value: string;

  constructor(ast: TerminalNode, offset: number) {
    super(ast, offset);

    this.value = ast.unparse();
  }

  print(): Doc {
    return printBlockComment(this);
  }
}
