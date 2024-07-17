import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { ErrorParameter } from './ErrorParameter.js';

export class ErrorParameters extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { items, separators } = ast;
      this.items = items.map(
        (item) =>
          new ErrorParameter(item, childrenOffsets.shift(), comments, options)
      );
      this.separators = separators.map((separator) => separator.text);
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'))
      : '';
  }
}
