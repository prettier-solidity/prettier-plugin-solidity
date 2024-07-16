import { SlangNode } from './SlangNode.js';

export class YulBreakStatement extends SlangNode {
  breakKeyword;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print() {
    return this.breakKeyword;
  }
}
