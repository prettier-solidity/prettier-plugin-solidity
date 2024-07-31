import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ImportDeconstructionSymbols } from './ImportDeconstructionSymbols.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class ImportDeconstruction implements SlangNode {
  readonly kind = NonterminalKind.ImportDeconstruction;

  comments;

  loc;

  openBrace: string;

  symbols: ImportDeconstructionSymbols;

  closeBrace: string;

  fromKeyword: string;

  path: StringLiteral;

  constructor(
    ast: ast.ImportDeconstruction,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openBrace = ast.openBrace.text;
    this.symbols = new ImportDeconstructionSymbols(ast.symbols, offsets[0]);
    this.closeBrace = ast.closeBrace.text;
    this.fromKeyword = ast.fromKeyword.text;
    this.path = new StringLiteral(ast.path, offsets[1], options);

    metadata = updateMetadata(metadata, [this.symbols, this.path]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      this.openBrace,
      path.call(print, 'symbols'),
      `${this.closeBrace} ${this.fromKeyword} `,
      path.call(print, 'path')
    ];
  }
}
