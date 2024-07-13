import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

export class YulParameters extends SlangNode {
  items;

  separators;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.items = ast.items.map((item) => item.text);
    this.separators = ast.separators.map((separator) => separator.text);
    this.initiateLoc(ast);
  }

  print() {
    return printSeparatedList(this.items);
  }
}
