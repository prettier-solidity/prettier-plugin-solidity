import { SlangNode } from './SlangNode.js';

export class BreakStatement extends SlangNode {
  breakKeyword;

  semicolon;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print() {
    return `${this.breakKeyword}${this.semicolon}`;
  }
}
