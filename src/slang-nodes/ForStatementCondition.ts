import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ExpressionStatement } from './ExpressionStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ForStatementCondition implements SlangNode {
  readonly kind = NonterminalKind.ForStatementCondition;

  comments;

  loc;

  variant: ExpressionStatement | string;

  constructor(ast: ast.ForStatementCondition) {
    let metadata = getNodeMetadata(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.unparse()
        : new ExpressionStatement(ast.variant);

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ForStatementCondition>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
