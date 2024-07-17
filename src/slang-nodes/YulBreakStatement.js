import { SlangNode } from './SlangNode.js';

export class YulBreakStatement extends SlangNode {
  breakKeyword;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      breakKeyword: ast.breakKeyword.text
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return this.breakKeyword;
  }
}
