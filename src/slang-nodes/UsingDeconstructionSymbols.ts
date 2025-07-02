import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { UsingDeconstructionSymbol } from './UsingDeconstructionSymbol.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { line, softline } = doc.builders;

export class UsingDeconstructionSymbols extends SlangNode {
  readonly kind = NonterminalKind.UsingDeconstructionSymbols;

  items: UsingDeconstructionSymbol[];

  constructor(ast: ast.UsingDeconstructionSymbols) {
    super(ast);

    this.items = ast.items.map((item) => new UsingDeconstructionSymbol(item));

    this.updateMetadata(this.items);
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
