import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ImportDeconstructionSymbols } from './ImportDeconstructionSymbols.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ImportDeconstruction implements SlangNode {
  readonly kind = NonterminalKind.ImportDeconstruction;

  comments;

  loc;

  symbols: ImportDeconstructionSymbols;

  path: StringLiteral;

  constructor(ast: ast.ImportDeconstruction, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.symbols = new ImportDeconstructionSymbols(ast.symbols);
    this.path = new StringLiteral(ast.path, options);

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
