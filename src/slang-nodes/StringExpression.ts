import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { StringLiterals } from './StringLiterals.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { HexStringLiterals } from './HexStringLiterals.js';
import { UnicodeStringLiterals } from './UnicodeStringLiterals.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  StringExpression,
  ast.StringExpression
>([
  [ast.StringLiteral, StringLiteral],
  [ast.StringLiterals, StringLiterals],
  [ast.HexStringLiteral, HexStringLiteral],
  [ast.HexStringLiterals, HexStringLiterals],
  [ast.UnicodeStringLiterals, UnicodeStringLiterals]
]);

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
