import { SlangNode } from './SlangNode.js';

export class BreakStatement extends SlangNode {
  breakKeyword;

  semicolon;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.breakKeyword = ast.breakKeyword.text;
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print() {
    return `${this.breakKeyword}${this.semicolon}`;
  }
}
