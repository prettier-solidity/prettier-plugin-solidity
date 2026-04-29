import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { YulEqualAndColon } from './YulEqualAndColon.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

export class YulStackAssignmentOperator extends PolymorphicNode<
  ast.YulStackAssignmentOperator,
  YulEqualAndColon | TerminalNode
> {
  readonly kind = NonterminalKind.YulStackAssignmentOperator;

  constructor(
    ast: ast.YulStackAssignmentOperator,
    collected: CollectedMetadata
  ) {
    super(
      ast,
      collected,
      (variant) => new YulEqualAndColon(variant, collected)
    );
  }
}
