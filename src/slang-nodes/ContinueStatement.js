import { SlangNode } from './SlangNode.js';

export class ContinueStatement extends SlangNode {
  continueKeyword;

  semicolon;

  constructor(ast, offset) {
    super(ast, offset);
    this.continueKeyword = ast.continueKeyword.text;
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print() {
    return `${this.continueKeyword}${this.semicolon}`;
  }
}
