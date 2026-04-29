import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { ExpressionStatement } from './ExpressionStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

export class ForStatementCondition extends PolymorphicNode<
  ast.ForStatementCondition,
  ExpressionStatement | TerminalNode
> {
  readonly kind = NonterminalKind.ForStatementCondition;

  constructor(ast: ast.ForStatementCondition, collected: CollectedMetadata) {
    super(
      ast,
      collected,
      (variant) => new ExpressionStatement(variant, collected)
    );
  }
}
