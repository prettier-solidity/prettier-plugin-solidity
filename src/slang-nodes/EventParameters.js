import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';
import { EventParameter } from './EventParameter.js';

export class EventParameters extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      items: ast.items.map(
        (item) =>
          new EventParameter(item, childrenOffsets.shift(), comments, options)
      ),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return this.items.length > 0
      ? printSeparatedList(path.map(print, 'items'))
      : '';
  }
}
