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

    if (offset) {
      const fetch = (childrenOffsets) => ({
        items: ast.items.map(
          (item) => new TupleValue(item, childrenOffsets.shift(), options)
        ),
        separators: ast.separators.map((separator) => separator.text)
      });

      this.initialize(ast, offset, fetch);
    } else {
      this.loc = ast.loc;
      this.items = ast.items;
      this.separators = ast.separators;
    }
  }

  print(path, print) {
    return this.items.length === 1 &&
      isBinaryOperation(this.items[0].expression.variant)
      ? path.map(print, 'items')
      : printSeparatedList(path.map(print, 'items'));
  }
}
