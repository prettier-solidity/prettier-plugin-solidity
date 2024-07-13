import { SlangNode } from './SlangNode.js';

export class YulContinueStatement extends SlangNode {
  continueKeyword;

  constructor(ast, offset) {
    super(ast, offset);
    this.continueKeyword = ast.continueKeyword.text;
    this.initiateLoc(ast);
  }

  print() {
    return this.continueKeyword;
  }
}
