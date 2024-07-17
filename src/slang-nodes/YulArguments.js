import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';

export class YulArguments extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new YulExpression(item, childrenOffsets.shift(), comments, options)
      ),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return printSeparatedList(path.map(print, 'items'));
  }
}
