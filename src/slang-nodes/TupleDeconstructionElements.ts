import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.ts';
import { SlangNode } from './SlangNode.ts';
import { TupleDeconstructionElement } from './TupleDeconstructionElement.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class TupleDeconstructionElements extends SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionElements;

  items: TupleDeconstructionElement[];

  constructor(
    ast: ast.TupleDeconstructionElements,
    collected: CollectedMetadata
  ) {
    super(ast, collected, true);

    this.items = ast.items.map(
      (item) => new TupleDeconstructionElement(item, collected)
    );
  }

  print(print: PrintFunction, path: AstPath<TupleDeconstructionElements>): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
