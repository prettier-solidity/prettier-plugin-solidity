import { SlangNode } from './SlangNode.js';

export class YulContinueStatement extends SlangNode {
  continueKeyword;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => {
      const { continueKeyword } = ast;
      this.continueKeyword = continueKeyword.text;
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print() {
    return this.continueKeyword;
  }
}
