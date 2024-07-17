import { SlangNode } from './SlangNode.js';

export class BreakStatement extends SlangNode {
  breakKeyword;

  semicolon;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => ({
      breakKeyword: ast.breakKeyword.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return `${this.breakKeyword}${this.semicolon}`;
  }
}
