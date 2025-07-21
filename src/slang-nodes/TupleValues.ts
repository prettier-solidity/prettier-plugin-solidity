import { NonterminalKind, TerminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TupleValue } from './TupleValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';
import type { Expression } from './Expression.js';

export class TupleValues implements SlangNode {
  readonly kind = NonterminalKind.TupleValues;

  comments;

  loc;

  items: TupleValue[];

  constructor(ast: ast.TupleValues, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new TupleValue(item, options));

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  getSingleExpression(): Expression | undefined {
    const items = this.items;
    return items.length === 1 ? items[0].expression : undefined;
  }

  print(path: AstPath<TupleValues>, print: PrintFunction): Doc {
    const singleExpressionVariant = this.getSingleExpression()?.variant;
    return singleExpressionVariant &&
      singleExpressionVariant.kind !== TerminalKind.Identifier &&
      isBinaryOperation(singleExpressionVariant)
      ? path.map(print, 'items')
      : printSeparatedList(path.map(print, 'items'));
  }
}
