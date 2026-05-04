import * as ast from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';
import { TerminalNode } from './TerminalNode.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.FunctionAttribute,
  FunctionAttribute
>([
  [ast.ModifierInvocation, ModifierInvocation],
  [ast.OverrideSpecifier, OverrideSpecifier]
]);

export class FunctionAttribute extends SlangNode {
  readonly kind = NonterminalKind.FunctionAttribute;

  variant: ModifierInvocation | OverrideSpecifier | TerminalNode;

  constructor(ast: ast.FunctionAttribute, collected: CollectedMetadata) {
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
