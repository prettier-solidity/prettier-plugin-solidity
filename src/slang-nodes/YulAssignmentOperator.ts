import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { YulColonAndEqual } from './YulColonAndEqual.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

export class YulAssignmentOperator extends PolymorphicNode<
  ast.YulAssignmentOperator,
  YulColonAndEqual | TerminalNode
> {
  readonly kind = NonterminalKind.YulAssignmentOperator;

  constructor(ast: ast.YulAssignmentOperator, collected: CollectedMetadata) {
    super(
      ast,
      collected,
      (variant) => new YulColonAndEqual(variant, collected)
    );
  }
}
