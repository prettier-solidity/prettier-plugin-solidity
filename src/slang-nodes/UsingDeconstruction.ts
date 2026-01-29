import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { UsingDeconstructionSymbols } from './UsingDeconstructionSymbols.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class UsingDeconstruction extends SlangNode {
  readonly kind = NonterminalKind.UsingDeconstruction;

  symbols: UsingDeconstructionSymbols;

  constructor(ast: ast.UsingDeconstruction, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.symbols = new UsingDeconstructionSymbols(ast.symbols, options);

    this.updateMetadata(this.symbols);
  }

  print(path: AstPath<UsingDeconstruction>, print: PrintFunction): Doc {
    return ['{', path.call(print, 'symbols'), '}'];
  }
}
