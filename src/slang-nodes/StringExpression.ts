import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { StringLiterals } from './StringLiterals.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { HexStringLiterals } from './HexStringLiterals.js';
import { UnicodeStringLiterals } from './UnicodeStringLiterals.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.StringExpression['variant'],
  options: ParserOptions<AstNode>
): StringExpression['variant'] {
  if (variant instanceof ast.StringLiteral) {
    return new StringLiteral(variant, options);
  }
  if (variant instanceof ast.StringLiterals) {
    return new StringLiterals(variant, options);
  }
  if (variant instanceof ast.HexStringLiteral) {
    return new HexStringLiteral(variant, options);
  }
  if (variant instanceof ast.HexStringLiterals) {
    return new HexStringLiterals(variant, options);
  }
  if (variant instanceof ast.UnicodeStringLiterals) {
    return new UnicodeStringLiterals(variant, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class StringExpression extends SlangNode {
  readonly kind = NonterminalKind.StringExpression;

  variant:
    | StringLiteral
    | StringLiterals
    | HexStringLiteral
    | HexStringLiterals
    | UnicodeStringLiterals;

  constructor(ast: ast.StringExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
