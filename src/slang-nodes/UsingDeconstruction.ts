import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { UsingDeconstructionSymbols } from './UsingDeconstructionSymbols.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class UsingDeconstruction extends SlangNode {
  readonly kind = NonterminalKind.UsingDeconstruction;

  symbols: UsingDeconstructionSymbols;

  constructor(ast: ast.UsingDeconstruction, collected: CollectedMetadata) {
    super(ast, collected);

    this.symbols = new UsingDeconstructionSymbols(ast.symbols, collected);

    this.updateMetadata(this.symbols);
  }

  print(print: PrintFunction): Doc {
    return ['{', print('symbols'), '}'];
  }
}
