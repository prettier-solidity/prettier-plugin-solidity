import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNode } from './PolymorphicNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';

import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.FunctionAttribute,
  FunctionAttribute
>([
  [ast.ModifierInvocation, ModifierInvocation],
  [ast.OverrideSpecifier, OverrideSpecifier]
]);

export class FunctionAttribute extends PolymorphicNode<
  ast.FunctionAttribute,
  ModifierInvocation | OverrideSpecifier | TerminalNode
> {
  readonly kind = NonterminalKind.FunctionAttribute;

  constructor(ast: ast.FunctionAttribute, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
