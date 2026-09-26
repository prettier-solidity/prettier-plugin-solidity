import * as ast from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { ModifierInvocation } from './ModifierInvocation.ts';
import { OverrideSpecifier } from './OverrideSpecifier.ts';
import { TerminalNode } from './TerminalNode.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.ReceiveFunctionAttribute,
  ReceiveFunctionAttribute
>([
  [ast.ModifierInvocation, ModifierInvocation],
  [ast.OverrideSpecifier, OverrideSpecifier]
]);

export class ReceiveFunctionAttribute extends SlangNode {
  readonly kind = NonterminalKind.ReceiveFunctionAttribute;

  variant: ModifierInvocation | OverrideSpecifier | TerminalNode;

  constructor(ast: ast.ReceiveFunctionAttribute, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = createNonterminalVariant(variant, collected);

    this.updateMetadata(this.variant);
  }
}
