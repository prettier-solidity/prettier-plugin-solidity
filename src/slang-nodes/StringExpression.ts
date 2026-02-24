import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { StringLiterals } from './StringLiterals.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { HexStringLiterals } from './HexStringLiterals.js';
import { UnicodeStringLiterals } from './UnicodeStringLiterals.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  slangAst.StringExpression,
  StringExpression
>([
  [slangAst.StringLiteral, StringLiteral],
  [slangAst.StringLiterals, StringLiterals],
  [slangAst.HexStringLiteral, HexStringLiteral],
  [slangAst.HexStringLiterals, HexStringLiterals],
  [slangAst.UnicodeStringLiterals, UnicodeStringLiterals]
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
    ast: slangAst.StringExpression,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of
      // `StringExpression` in the `createNonterminalVariant` function above.
      ((variant: slangAst.StringExpression['variant']): void => {
        if (variant instanceof slangAst.StringLiteral) return;
        if (variant instanceof slangAst.StringLiterals) return;
        if (variant instanceof slangAst.HexStringLiteral) return;
        if (variant instanceof slangAst.HexStringLiterals) return;
        if (variant instanceof slangAst.UnicodeStringLiterals) return;
        /* c8 ignore next 2 */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = variant;
      })(ast.variant);
    }
    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
