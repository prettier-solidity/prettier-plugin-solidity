import { SlangNode } from './SlangNode.js';

export class YulBreakStatement extends SlangNode {
  breakKeyword;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => ({
      breakKeyword: ast.breakKeyword.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return this.breakKeyword;
  }
}
