import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { StringLiteral } from './StringLiteral.js';
import { StringLiterals } from './StringLiterals.js';
import { HexStringLiteral } from './HexStringLiteral.js';
import { HexStringLiterals } from './HexStringLiterals.js';
import { UnicodeStringLiterals } from './UnicodeStringLiterals.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class StringExpression implements SlangNode {
  readonly kind = NonterminalKind.StringExpression;

  comments;

  loc;

  variant:
    | StringLiteral
    | StringLiterals
    | HexStringLiteral
    | HexStringLiterals
    | UnicodeStringLiterals;

  constructor(
    ast: ast.StringExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case NonterminalKind.StringLiteral:
        this.variant = new StringLiteral(
          ast.variant as ast.StringLiteral,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.StringLiterals:
        this.variant = new StringLiterals(
          ast.variant as ast.StringLiterals,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.HexStringLiteral:
        this.variant = new HexStringLiteral(
          ast.variant as ast.HexStringLiteral,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.HexStringLiterals:
        this.variant = new HexStringLiterals(
          ast.variant as ast.HexStringLiterals,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.UnicodeStringLiterals:
        this.variant = new UnicodeStringLiterals(
          ast.variant as ast.UnicodeStringLiterals,
          offsets[0],
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<StringExpression>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
