import { SlangNode } from './SlangNode.js';

export class ContinueStatement extends SlangNode {
  continueKeyword;

  semicolon;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => ({
      continueKeyword: ast.continueKeyword.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return `${this.continueKeyword}${this.semicolon}`;
  }
}
