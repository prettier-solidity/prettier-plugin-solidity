import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { UsingDeconstructionSymbol } from './UsingDeconstructionSymbol.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './index.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { line, softline } = doc.builders;

export class UsingDeconstructionSymbols implements SlangNode {
  readonly kind = NonterminalKind.UsingDeconstructionSymbols;

  comments;

  loc;

  items: UsingDeconstructionSymbol[];

  separators: string[];

  constructor(ast: ast.UsingDeconstructionSymbols, offset: number) {
    let metadata = getNodeMetadata(ast, offset, true);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new UsingDeconstructionSymbol(item, offsets[index])
    );
    this.separators = ast.separators.map((separator) => separator.unparse());

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
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
