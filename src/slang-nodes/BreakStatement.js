import { SlangNode } from './SlangNode.js';

export class BreakStatement extends SlangNode {
  breakKeyword;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print() {
    return `${this.breakKeyword}${this.semicolon}`;
  }
}
