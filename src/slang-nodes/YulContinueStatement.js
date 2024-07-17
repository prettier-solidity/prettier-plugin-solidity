import { SlangNode } from './SlangNode.js';

export class YulContinueStatement extends SlangNode {
  continueKeyword;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      continueKeyword: ast.continueKeyword.text
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return this.continueKeyword;
  }
}
