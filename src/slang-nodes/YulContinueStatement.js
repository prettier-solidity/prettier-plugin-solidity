import { SlangNode } from './SlangNode.js';

export class YulContinueStatement extends SlangNode {
  continueKeyword;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => ({
      continueKeyword: ast.continueKeyword.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return this.continueKeyword;
  }
}
