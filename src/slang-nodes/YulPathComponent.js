import { SlangNode } from './SlangNode.js';

export class YulPathComponent extends SlangNode {
  variant;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print() {
    return this.variant;
  }
}
