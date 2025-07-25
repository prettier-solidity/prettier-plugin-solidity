import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { StringLiteral } from './StringLiteral.js';
import { StringLiterals } from './StringLiterals.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { HexStringLiterals } from './HexStringLiterals.js';
import { UnicodeStringLiterals } from './UnicodeStringLiterals.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.StringExpression['variant'],
  options: ParserOptions<AstNode>
): StringExpression['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.StringLiteral:
      return new StringLiteral(variant as ast.StringLiteral, options);
    case NonterminalKind.StringLiterals:
      return new StringLiterals(variant as ast.StringLiterals, options);
    case NonterminalKind.HexStringLiteral:
      return new HexStringLiteral(variant as ast.HexStringLiteral, options);
    case NonterminalKind.HexStringLiterals:
      return new HexStringLiterals(variant as ast.HexStringLiterals, options);
    case NonterminalKind.UnicodeStringLiterals:
      return new UnicodeStringLiterals(
        variant as ast.UnicodeStringLiterals,
        options
      );
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
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

  print(path: AstPath<StringExpression>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
