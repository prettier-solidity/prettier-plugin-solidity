import { SlangNode } from './SlangNode.js';

export class YulBreakStatement extends SlangNode {
  breakKeyword;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => {
      const { breakKeyword } = ast;
      this.breakKeyword = breakKeyword.text;
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return this.breakKeyword;
  }
}
