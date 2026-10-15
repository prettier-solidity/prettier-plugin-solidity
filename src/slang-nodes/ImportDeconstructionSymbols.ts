import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { satisfies } from 'semver';
import { line, softline } from '../slang-printers/prettier-builders.ts';
import { printSeparatedList } from '../slang-printers/print-separated-list.ts';
import { SlangNode } from './SlangNode.ts';
import { ImportDeconstructionSymbol } from './ImportDeconstructionSymbol.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class ImportDeconstructionSymbols extends SlangNode {
  readonly kind = NonterminalKind.ImportDeconstructionSymbols;

  #split: boolean;

  items: ImportDeconstructionSymbol[];

  constructor(
    ast: ast.ImportDeconstructionSymbols,
    collected: CollectedMetadata
  ) {
    super(ast, collected, true);

    this.items = ast.items.map(
      (item) => new ImportDeconstructionSymbol(item, collected)
    );

    this.#split =
      this.items.length > 1 && satisfies(collected.compiler, '>=0.7.4');
  }

  print(
    print: PrintFunction,
    path: AstPath<ImportDeconstructionSymbols>,
    { bracketSpacing }: ParserOptions<PrintableNode>
  ): Doc {
    return printSeparatedList(
      path.map(print, 'items'),
      this.#split
        ? {
            // if the code targets ≥0.7.4 we will split the ImportDirective.
            firstSeparator: bracketSpacing ? line : softline
          }
        : {
            // below 0.7.4 we will not split the ImportDirective.
            firstSeparator: bracketSpacing ? ' ' : '',
            separator: ', '
          }
    );
  }
}
