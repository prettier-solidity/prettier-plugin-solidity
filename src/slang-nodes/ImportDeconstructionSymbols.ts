import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { satisfies } from 'semver';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { ImportDeconstructionSymbol } from './ImportDeconstructionSymbol.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const { line, softline } = doc.builders;

export class ImportDeconstructionSymbols extends NodeCollection<
  ast.ImportDeconstructionSymbols,
  ImportDeconstructionSymbol
> {
  readonly kind = NonterminalKind.ImportDeconstructionSymbols;

  constructor(
    ast: ast.ImportDeconstructionSymbols,
    collected: CollectedMetadata
  ) {
    super(ast, collected, ImportDeconstructionSymbol);
  }

  print(
    print: PrintFunction,
    path: AstPath<ImportDeconstructionSymbols>,
    { compiler, bracketSpacing }: ParserOptions<PrintableNode>
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
