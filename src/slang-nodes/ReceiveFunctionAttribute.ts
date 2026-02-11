import * as ast from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';
import { TerminalNode } from './TerminalNode.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const variantConstructors = {
  [ast.ModifierInvocation.name]: ModifierInvocation,
  [ast.OverrideSpecifier.name]: OverrideSpecifier
};

function createNonterminalVariant(
  variant: Exclude<ast.ReceiveFunctionAttribute['variant'], SlangTerminalNode>,
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): Exclude<ReceiveFunctionAttribute['variant'], TerminalNode> {
  const variantConstructor = variantConstructors[variant.constructor.name];
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected, options);

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
}

export class ReceiveFunctionAttribute extends SlangNode {
  readonly kind = NonterminalKind.ReceiveFunctionAttribute;

  variant: ModifierInvocation | OverrideSpecifier | TerminalNode;

  constructor(
    ast: ast.ReceiveFunctionAttribute,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = createNonterminalVariant(variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
