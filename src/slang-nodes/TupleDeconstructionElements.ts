import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TupleDeconstructionElement } from './TupleDeconstructionElement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class TupleDeconstructionElements implements SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionElements;

  comments;

  loc;

  items: TupleDeconstructionElement[];

  constructor(
    ast: ast.TupleDeconstructionElements,
    options: ParserOptions<AstNode>
  ) {
    const metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map(
      (item) => new TupleDeconstructionElement(item, options)
    );

    [this.loc, this.comments] = updateMetadata(metadata, [this.items]);
  }

  print(path: AstPath<TupleDeconstructionElements>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
