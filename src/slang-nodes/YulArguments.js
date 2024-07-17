import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';

export class YulArguments extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items, separators } = ast;
      this.items = items.map(
        (item) =>
          new YulExpression(item, childrenOffsets.shift(), comments, options)
      );
      this.separators = separators.map((separator) => separator.text);
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return printSeparatedList(path.map(print, 'items'));
  }
}
