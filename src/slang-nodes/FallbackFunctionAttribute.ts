import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';
import { OverrideSpecifier } from './OverrideSpecifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class FallbackFunctionAttribute extends SlangNode {
  readonly kind = NonterminalKind.FallbackFunctionAttribute;

  variant: ModifierInvocation | OverrideSpecifier | string;

  constructor(
    ast: ast.FallbackFunctionAttribute,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof TerminalNode) {
      this.variant = variant.unparse();
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

  print(path: AstPath<FallbackFunctionAttribute>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
