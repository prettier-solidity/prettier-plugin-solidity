import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ImportDeconstructionSymbols } from './ImportDeconstructionSymbols.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ImportDeconstruction extends SlangNode {
  readonly kind = NonterminalKind.ImportDeconstruction;

  symbols: ImportDeconstructionSymbols;

  path: StringLiteral;

  constructor(ast: ast.ImportDeconstruction, options: ParserOptions<AstNode>) {
    super(ast);

    this.symbols = new ImportDeconstructionSymbols(ast.symbols);
    this.path = new StringLiteral(ast.path, options);

    this.updateMetadata(this.symbols, this.path);
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
