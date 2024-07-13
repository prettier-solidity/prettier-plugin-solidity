import { SlangNode } from './SlangNode.js';

export class YulBreakStatement extends SlangNode {
  breakKeyword;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.breakKeyword = ast.breakKeyword.text;
    this.initiateLoc(ast);
  }

  print() {
    return this.breakKeyword;
  }
}
