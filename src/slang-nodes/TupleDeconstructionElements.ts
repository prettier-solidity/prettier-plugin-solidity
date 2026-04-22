import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { TupleDeconstructionElement } from './TupleDeconstructionElement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class TupleDeconstructionElements extends NodeCollection<
  ast.TupleDeconstructionElements,
  TupleDeconstructionElement
> {
  readonly kind = NonterminalKind.TupleDeconstructionElements;

  constructor(
    ast: ast.TupleDeconstructionElements,
    collected: CollectedMetadata
  ) {
    super(ast, collected, TupleDeconstructionElement);
  }

  print(print: PrintFunction, path: AstPath<TupleDeconstructionElements>): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
