import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { SlangNode } from './SlangNode.js';
import { TupleDeconstructionElement } from './TupleDeconstructionElement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class TupleDeconstructionElements extends SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionElements;

  items: TupleDeconstructionElement[];

  constructor(
    ast: ast.TupleDeconstructionElements,
    options: ParserOptions<AstNode>
  ) {
    super(ast, true);

    this.items = ast.items.map(
      (item) => new TupleDeconstructionElement(item, options)
    );
  }

  print(path: AstPath<TupleDeconstructionElements>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
