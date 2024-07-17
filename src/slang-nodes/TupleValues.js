import { printSeparatedList } from '../common/printer-helpers.js';
import { isBinaryOperation } from '../slang-utils/is-binary-operation.js';
import { SlangNode } from './SlangNode.js';
import { TupleValue } from './TupleValue.js';

export class TupleValues extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, parse, options) {
    super();
    if (offset) {
      const fetch = (childrenOffsets) => {
        const { items, separators } = ast;
        this.items = items.map(
          (item) =>
            new TupleValue(
              item,
              childrenOffsets.shift(),
              comments,
              parse,
              options
            )
        );
        this.separators = separators.map((separator) => separator.text);
      };

      this.initialize(ast, offset, comments, fetch, parse);
    } else {
      this.kind = ast.kind;
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
