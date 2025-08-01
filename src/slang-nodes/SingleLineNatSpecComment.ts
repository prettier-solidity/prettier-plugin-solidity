import { TerminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { CommentNode } from './CommentNode.js';

import type { Doc } from 'prettier';

export class SingleLineNatSpecComment extends CommentNode {
  readonly kind = TerminalKind.SingleLineNatSpecComment;

  value: string;

  constructor(ast: TerminalNode, offset: number) {
    super(ast, offset);

    this.value = ast.unparse();
  }

  print(): Doc {
    return this.value.trimEnd();
  }
}
