import { SlangNode } from './SlangNode.js';

export class ThrowStatement extends SlangNode {
  throwKeyword;

  semicolon;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.throwKeyword = ast.throwKeyword.text;
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  // TODO: implement print
  print({ path, print, options }) {
    return ['TODO: ThrowStatement'];
  }
}
