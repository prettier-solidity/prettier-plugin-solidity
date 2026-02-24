import * as slangAst from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';
import { TerminalNode } from './TerminalNode.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  slangAst.ReceiveFunctionAttribute,
  ReceiveFunctionAttribute
>([
  [slangAst.ModifierInvocation, ModifierInvocation],
  [slangAst.OverrideSpecifier, OverrideSpecifier]
]);

export class ReceiveFunctionAttribute extends SlangNode {
  readonly kind = NonterminalKind.ReceiveFunctionAttribute;

  variant: ModifierInvocation | OverrideSpecifier | TerminalNode;

  constructor(
    ast: slangAst.ReceiveFunctionAttribute,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of
      // `ReceiveFunctionAttribute` in the `createNonterminalVariant` function
      // above.
      ((
        variant: Exclude<
          slangAst.ReceiveFunctionAttribute['variant'],
          SlangTerminalNode
        >
      ): void => {
        if (variant instanceof slangAst.ModifierInvocation) return;
        if (variant instanceof slangAst.OverrideSpecifier) return;
      })(variant);
    }
    this.variant = createNonterminalVariant(variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
