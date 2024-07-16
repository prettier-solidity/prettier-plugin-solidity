import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

export class ArrayValues extends SlangNode {
  items;

  separators;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return printSeparatedList(path.map(print, 'items'));
  }
}
