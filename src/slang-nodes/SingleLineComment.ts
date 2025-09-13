import { TerminalKind } from '@nomicfoundation/slang/cst';
import { CommentNode } from './CommentNode.js';

import type { TerminalNode } from '@nomicfoundation/slang/cst';
import type { Doc } from 'prettier';

export class SingleLineComment extends CommentNode {
  readonly kind = TerminalKind.SingleLineComment;

  value: string;

  constructor(ast: TerminalNode, offset: number) {
    super(ast, offset);

    this.value = ast.unparse();
  }

  print(): Doc {
    return this.value.trimEnd();
  }
}
