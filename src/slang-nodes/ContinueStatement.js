import { SlangNode } from './SlangNode.js';

export class ContinueStatement extends SlangNode {
  continueKeyword;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print() {
    return `${this.continueKeyword}${this.semicolon}`;
  }
}
