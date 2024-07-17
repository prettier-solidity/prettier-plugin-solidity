import { SlangNode } from './SlangNode.js';

export class BreakStatement extends SlangNode {
  breakKeyword;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super();

    const fetch = () => {
      const { breakKeyword, semicolon } = ast;
      this.breakKeyword = breakKeyword.text;
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print() {
    return `${this.breakKeyword}${this.semicolon}`;
  }
}
