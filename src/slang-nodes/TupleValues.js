import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../common/printer-helpers.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { SlangNode } from './SlangNode.js';
import { TupleValue } from './TupleValue.js';

export class TupleValues extends SlangNode {
  get kind() {
    return NonterminalKind.TupleValues;
  }

  items;

  separators;

  constructor(ast, offset, options) {
    super();

    const fetch =
      typeof offset !== 'undefined'
        ? (childrenOffsets) => ({
            items: ast.items.map(
              (item) => new TupleValue(item, childrenOffsets.shift(), options)
            ),
            separators: ast.separators.map((separator) => separator.text)
          })
        : undefined;

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return this.items.length === 1 &&
      isBinaryOperation(this.items[0].expression.variant)
      ? path.map(print, 'items')
      : printSeparatedList(path.map(print, 'items'));
  }
}
