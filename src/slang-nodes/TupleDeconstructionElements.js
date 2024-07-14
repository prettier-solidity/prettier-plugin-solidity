import { printSeparatedList } from '../common/printer-helpers.js';
import { SlangNode } from './SlangNode.js';

export class TupleDeconstructionElements extends SlangNode {
  items;

  separators;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return printSeparatedList(path.map(print, 'items'));
  }
}
