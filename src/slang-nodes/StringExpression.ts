import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { StringLiteral } from './StringLiteral.ts';
import { StringLiterals } from './StringLiterals.ts';
import { HexStringLiteral } from './HexStringLiteral.ts';
import { HexStringLiterals } from './HexStringLiterals.ts';
import { UnicodeStringLiterals } from './UnicodeStringLiterals.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.StringExpression,
  StringExpression
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

  constructor(ast: ast.StringExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
