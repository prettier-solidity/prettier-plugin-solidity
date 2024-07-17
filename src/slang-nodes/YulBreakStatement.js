import { SlangNode } from './SlangNode.js';

export class YulBreakStatement extends SlangNode {
  breakKeyword;

  constructor(ast, offset, comments, parse) {
    super();

    const fetch = () => {
      const { breakKeyword } = ast;
      this.breakKeyword = breakKeyword.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print() {
    return this.breakKeyword;
  }
}
