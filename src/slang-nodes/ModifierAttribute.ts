import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

export class ModifierAttribute extends PolymorphicNode<
  ast.ModifierAttribute,
  OverrideSpecifier | TerminalNode
> {
  readonly kind = NonterminalKind.ModifierAttribute;

  constructor(ast: ast.ModifierAttribute, collected: CollectedMetadata) {
    super(
      ast,
      collected,
      (variant) => new OverrideSpecifier(variant, collected)
    );
  }
}
