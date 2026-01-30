import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { UsingDeconstructionSymbol } from './UsingDeconstructionSymbol.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line, softline } = doc.builders;

export class UsingDeconstructionSymbols extends SlangNode {
  readonly kind = NonterminalKind.UsingDeconstructionSymbols;

  items: UsingDeconstructionSymbol[];

  constructor(
    ast: ast.UsingDeconstructionSymbols,
    collected: CollectedMetadata
  ) {
    super(ast, collected, true);

    this.items = ast.items.map(
      (item) => new UsingDeconstructionSymbol(item, collected)
    );
  }

  print(
    path: AstPath<UsingDeconstructionSymbols>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printSeparatedList(path.map(print, 'items'), {
      firstSeparator: options.bracketSpacing ? line : softline
    });
  }
}
