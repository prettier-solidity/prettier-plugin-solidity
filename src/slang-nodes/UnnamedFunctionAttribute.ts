import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

export class UnnamedFunctionAttribute extends PolymorphicNode<
  ast.UnnamedFunctionAttribute,
  ModifierInvocation | TerminalNode
> {
  readonly kind = NonterminalKind.UnnamedFunctionAttribute;

  constructor(ast: ast.UnnamedFunctionAttribute, collected: CollectedMetadata) {
    super(
      ast,
      collected,
      (variant) => new ModifierInvocation(variant, collected)
    );
  }
}
