import { TerminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { isIndentableBlockComment } from '../slang-utils/is-indentable-block-comment.js';
import { printIndentableBlockComment } from '../slang-printers/print-indentable-block-comment.js';
import { CommentNode } from './CommentNode.js';

import type { TerminalNode } from '@nomicfoundation/slang/cst';
import type { Doc } from 'prettier';

const { join, literalline } = doc.builders;

export class MultiLineNatSpecComment extends CommentNode {
  readonly kind = TerminalKind.MultiLineNatSpecComment;

  value: string;

  constructor(ast: TerminalNode, offset: number) {
    super(ast, offset);

    this.value = ast.unparse();
  }

  print(): Doc {
    if (isIndentableBlockComment(this)) {
      return printIndentableBlockComment(this);
    }
    return join(literalline, this.value.split('\n'));
  }
}
