import { SlangNode } from './SlangNode.js';

export class YulBreakStatement extends SlangNode {
  breakKeyword;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print() {
    return this.breakKeyword;
  }
}
