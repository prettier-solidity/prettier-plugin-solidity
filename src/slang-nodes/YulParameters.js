import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

export class YulParameters extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, parse) {
    super();

    const fetch = () => {
      const { items, separators } = ast;
      this.items = items.map((item) => item.text);
      this.separators = separators.map((separator) => separator.text);
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return printSeparatedList(this.items);
  }
}
