import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ImportDeconstructionSymbols } from './ImportDeconstructionSymbols.js';
import { StringLiteral } from './StringLiteral.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class ImportDeconstruction extends SlangNode {
  readonly kind = NonterminalKind.ImportDeconstruction;

  symbols: ImportDeconstructionSymbols;

  path: StringLiteral;

  constructor(
    ast: ast.ImportDeconstruction,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.symbols = new ImportDeconstructionSymbols(ast.symbols, collected);
    this.path = new StringLiteral(ast.path, collected, options);

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
