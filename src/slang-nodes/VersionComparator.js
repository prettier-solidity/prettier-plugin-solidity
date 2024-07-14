import { SlangNode } from './SlangNode.js';

export class VersionComparator extends SlangNode {
  operator;

  operand;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [this.operator, path.call(print, 'operand')];
  }
}
