import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

export class YulParameters extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => ({
      items: ast.items.map((item) => item.text),
      separators: ast.separators.map((separator) => separator.text)
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return printSeparatedList(this.items);
  }
}
