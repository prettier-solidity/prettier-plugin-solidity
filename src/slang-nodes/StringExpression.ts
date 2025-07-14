import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { StringLiteral } from './StringLiteral.js';
import { StringLiterals } from './StringLiterals.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { HexStringLiterals } from './HexStringLiterals.js';
import { UnicodeStringLiterals } from './UnicodeStringLiterals.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class StringExpression extends PolymorphicNode {
  readonly kind = NonterminalKind.StringExpression;

  variant:
    | StringLiteral
    | StringLiterals
    | HexStringLiteral
    | HexStringLiterals
    | UnicodeStringLiterals;

  constructor(ast: ast.StringExpression, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.StringLiteral:
        this.variant = new StringLiteral(variant as ast.StringLiteral, options);
        break;
      case NonterminalKind.StringLiterals:
        this.variant = new StringLiterals(
          variant as ast.StringLiterals,
          options
        );
        break;
      case NonterminalKind.HexStringLiteral:
        this.variant = new HexStringLiteral(
          variant as ast.HexStringLiteral,
          options
        );
        break;
      case NonterminalKind.HexStringLiterals:
        this.variant = new HexStringLiterals(
          variant as ast.HexStringLiterals,
          options
        );
        break;
      case NonterminalKind.UnicodeStringLiterals:
        this.variant = new UnicodeStringLiterals(
          variant as ast.UnicodeStringLiterals,
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }
}
