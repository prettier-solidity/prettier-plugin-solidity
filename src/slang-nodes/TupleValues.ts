import { NonterminalKind, TerminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { SlangNode } from './SlangNode.js';
import { TupleValue } from './TupleValue.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';
import type { Expression } from './Expression.js';

export class TupleValues extends SlangNode {
  readonly kind = NonterminalKind.TupleValues;

  items: TupleValue[];

  constructor(ast: ast.TupleValues, options: ParserOptions<AstNode>) {
    super(ast, true);

    this.items = ast.items.map((item) => new TupleValue(item, options));

    this.updateMetadata(this.items);
  }

  getSingleExpression(): Expression | undefined {
    const items = this.items;
    return items.length === 1 ? items[0].expression : undefined;
  }

  print(path: AstPath<TupleValues>, print: PrintFunction): Doc {
    const singleExpressionVariant = this.getSingleExpression()?.variant;
    const items = path.map(print, 'items');
    return singleExpressionVariant &&
      singleExpressionVariant.kind !== TerminalKind.Identifier &&
      isBinaryOperation(singleExpressionVariant)
      ? items
      : printSeparatedList(items);
  }
}
