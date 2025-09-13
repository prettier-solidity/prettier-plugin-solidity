import { doc } from 'prettier';
import { satisfies } from 'semver';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { ImportDeconstructionSymbol } from './ImportDeconstructionSymbol.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line, softline } = doc.builders;

export class ImportDeconstructionSymbols extends SlangNode {
  readonly kind = NonterminalKind.ImportDeconstructionSymbols;

  items: ImportDeconstructionSymbol[];

  constructor(ast: ast.ImportDeconstructionSymbols) {
    super(ast, true);

    this.items = ast.items.map((item) => new ImportDeconstructionSymbol(item));
  }

  print(
    path: AstPath<ImportDeconstructionSymbols>,
    print: PrintFunction,
    { compiler, bracketSpacing }: ParserOptions<AstNode>
  ): Doc {
    const items = path.map(print, 'items');
    return printSeparatedList(
      items,
      items.length > 1 && satisfies(compiler, '>=0.7.4')
        ? {
            // if the compiler exists and is greater than or equal to 0.7.4 we will
            // split the ImportDirective.
            firstSeparator: bracketSpacing ? line : softline
          }
        : {
            // if the compiler is not given or is lower than 0.7.4 we will not
            // split the ImportDirective.
            firstSeparator: bracketSpacing ? ' ' : '',
            separator: ', '
          }
    );
  }
}
