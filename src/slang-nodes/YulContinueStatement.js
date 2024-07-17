import { SlangNode } from './SlangNode.js';

export class YulContinueStatement extends SlangNode {
  continueKeyword;

  constructor(ast, offset, comments, parse) {
    super();

    const fetch = () => {
      const { continueKeyword } = ast;
      this.continueKeyword = continueKeyword.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print() {
    return this.continueKeyword;
  }
}
