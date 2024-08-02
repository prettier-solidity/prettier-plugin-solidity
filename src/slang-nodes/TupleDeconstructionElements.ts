import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TupleDeconstructionElement } from './TupleDeconstructionElement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class TupleDeconstructionElements implements SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionElements;

  comments;

  loc;

  items: TupleDeconstructionElement[];

  separators: string[];

  constructor(
    ast: ast.TupleDeconstructionElements,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) =>
        new TupleDeconstructionElement(item, offsets[index], options)
    );
    this.separators = ast.separators.map((separator) => separator.text);

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<TupleDeconstructionElements>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
