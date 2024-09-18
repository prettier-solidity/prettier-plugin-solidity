import {
  NonterminalKind,
  TerminalKind
} from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TupleValue } from './TupleValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class TupleValues implements SlangNode {
  readonly kind = NonterminalKind.TupleValues;

  comments;

  loc;

  items: TupleValue[];

  separators: string[];

  constructor(
    ast: ast.TupleValues,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset, true);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new TupleValue(item, offsets[index], options)
    );
    this.separators = ast.separators.map((separator) => separator.text);

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<TupleValues>, print: PrintFunction): Doc {
    return this.items.length === 1 &&
      this.items[0].expression &&
      this.items[0].expression.variant.kind !== TerminalKind.Identifier &&
      isBinaryOperation(this.items[0].expression.variant)
      ? path.map(print, 'items')
      : printSeparatedList(path.map(print, 'items'));
  }
}
