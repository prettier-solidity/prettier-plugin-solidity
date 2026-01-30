import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { StringLiterals } from './StringLiterals.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { HexStringLiterals } from './HexStringLiterals.js';
import { UnicodeStringLiterals } from './UnicodeStringLiterals.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.StringExpression['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): StringExpression['variant'] {
  if (variant instanceof ast.StringLiteral) {
    return new StringLiteral(variant, collected, options);
  }
  if (variant instanceof ast.StringLiterals) {
    return new StringLiterals(variant, collected, options);
  }
  if (variant instanceof ast.HexStringLiteral) {
    return new HexStringLiteral(variant, collected, options);
  }
  if (variant instanceof ast.HexStringLiterals) {
    return new HexStringLiterals(variant, collected, options);
  }
  if (variant instanceof ast.UnicodeStringLiterals) {
    return new UnicodeStringLiterals(variant, collected, options);
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

  constructor(
    ast: ast.StringExpression,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
