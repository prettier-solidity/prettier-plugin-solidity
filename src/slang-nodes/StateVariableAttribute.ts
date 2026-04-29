import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

export class StateVariableAttribute extends PolymorphicNode<
  ast.StateVariableAttribute,
  OverrideSpecifier | TerminalNode
> {
  readonly kind = NonterminalKind.StateVariableAttribute;

  constructor(ast: ast.StateVariableAttribute, collected: CollectedMetadata) {
    super(
      ast,
      collected,
      (variant) => new OverrideSpecifier(variant, collected)
    );
  }
}
