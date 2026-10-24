import { TerminalKind } from '@nomicfoundation/slang/cst';
import { CommentNode } from './CommentNode.ts';

import type { TerminalNode } from '@nomicfoundation/slang/cst';
import type { Doc } from 'prettier';

export class SingleLineComment extends CommentNode {
  readonly kind = TerminalKind.SingleLineComment;

  value: string;

  constructor(ast: TerminalNode, start: number, end: number) {
    super(start, end);

    this.value = ast.unparse();
  }

  print(): Doc {
    return this.value.trimEnd();
  }
}
