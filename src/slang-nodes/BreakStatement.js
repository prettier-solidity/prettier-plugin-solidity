import { SlangNode } from './SlangNode.js';

export class BreakStatement extends SlangNode {
  breakKeyword;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print() {
    return `${this.breakKeyword}${this.semicolon}`;
  }
}
