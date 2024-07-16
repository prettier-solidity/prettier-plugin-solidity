import { SlangNode } from './SlangNode.js';

export class YulContinueStatement extends SlangNode {
  continueKeyword;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print() {
    return this.continueKeyword;
  }
}
