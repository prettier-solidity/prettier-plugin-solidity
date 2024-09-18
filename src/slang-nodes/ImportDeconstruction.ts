import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ImportDeconstructionSymbols } from './ImportDeconstructionSymbols.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class ImportDeconstruction implements SlangNode {
  readonly kind = NonterminalKind.ImportDeconstruction;

  comments;

  loc;

  symbols: ImportDeconstructionSymbols;

  path: StringLiteral;

  constructor(
    ast: ast.ImportDeconstruction,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.symbols = new ImportDeconstructionSymbols(ast.symbols, offsets[0]);
    this.path = new StringLiteral(ast.path, offsets[1], options);

    metadata = updateMetadata(metadata, [this.symbols, this.path]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ImportDeconstruction>, print: PrintFunction): Doc {
    return [
      '{',
      path.call(print, 'symbols'),
      '} from ',
      path.call(print, 'path')
    ];
  }
}
