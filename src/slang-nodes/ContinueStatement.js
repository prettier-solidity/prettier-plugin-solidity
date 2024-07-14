import { SlangNode } from './SlangNode.js';

export class ContinueStatement extends SlangNode {
  continueKeyword;

  semicolon;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print() {
    return `${this.continueKeyword}${this.semicolon}`;
  }
}
