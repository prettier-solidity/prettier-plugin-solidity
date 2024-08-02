import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { UsingDeconstructionSymbols } from './UsingDeconstructionSymbols.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class UsingDeconstruction implements SlangNode {
  readonly kind = NonterminalKind.UsingDeconstruction;

  comments;

  loc;

  openBrace: string;

  symbols: UsingDeconstructionSymbols;

  closeBrace: string;

  constructor(ast: ast.UsingDeconstruction, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openBrace = ast.openBrace.text;
    this.symbols = new UsingDeconstructionSymbols(ast.symbols, offsets[0]);
    this.closeBrace = ast.closeBrace.text;

    metadata = updateMetadata(metadata, [this.symbols]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<UsingDeconstruction>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [this.openBrace, path.call(print, 'symbols'), this.closeBrace];
  }
}
