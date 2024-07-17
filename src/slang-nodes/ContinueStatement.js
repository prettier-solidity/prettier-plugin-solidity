import { SlangNode } from './SlangNode.js';

export class ContinueStatement extends SlangNode {
  continueKeyword;

  semicolon;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => {
      const { continueKeyword, semicolon } = ast;
      this.continueKeyword = continueKeyword.text;
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print() {
    return `${this.continueKeyword}${this.semicolon}`;
  }
}
