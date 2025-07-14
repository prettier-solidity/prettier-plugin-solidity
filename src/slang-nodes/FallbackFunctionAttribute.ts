import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class FallbackFunctionAttribute extends SlangNode {
  readonly kind = NonterminalKind.FallbackFunctionAttribute;

  variant: ModifierInvocation | OverrideSpecifier | TerminalNode;

  constructor(
    ast: ast.FallbackFunctionAttribute,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant);
      return;
    }
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.ModifierInvocation:
        this.variant = new ModifierInvocation(
          variant as ast.ModifierInvocation,
          options
        );
        break;
      case NonterminalKind.OverrideSpecifier:
        this.variant = new OverrideSpecifier(variant as ast.OverrideSpecifier);
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }
}
