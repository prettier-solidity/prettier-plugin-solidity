import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { UsingDeconstructionSymbol } from './UsingDeconstructionSymbol.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const { line, softline } = doc.builders;

export class UsingDeconstructionSymbols extends NodeCollection<
  ast.UsingDeconstructionSymbols,
  UsingDeconstructionSymbol
> {
  readonly kind = NonterminalKind.UsingDeconstructionSymbols;

  constructor(
    ast: ast.UsingDeconstructionSymbols,
    collected: CollectedMetadata
  ) {
    super(ast, collected, UsingDeconstructionSymbol);
  }

  print(
    print: PrintFunction,
    path: AstPath<UsingDeconstructionSymbols>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: options.bracketSpacing ? line : softline
    });
  }
}
