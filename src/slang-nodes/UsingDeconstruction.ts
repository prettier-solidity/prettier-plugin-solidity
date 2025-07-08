import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { UsingDeconstructionSymbols } from './UsingDeconstructionSymbols.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class UsingDeconstruction implements SlangNode {
  readonly kind = NonterminalKind.UsingDeconstruction;

  comments;

  loc;

  symbols: UsingDeconstructionSymbols;

  constructor(ast: ast.UsingDeconstruction) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.symbols = new UsingDeconstructionSymbols(ast.symbols);

    updateMetadata(this.loc, this.comments, [this.symbols]);
  }

  print(path: AstPath<UsingDeconstruction>, print: PrintFunction): Doc {
    return ['{', path.call(print, 'symbols'), '}'];
  }
}
