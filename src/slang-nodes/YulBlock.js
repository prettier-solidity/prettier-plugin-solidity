import { SlangNode } from './SlangNode.js';

export class YulBlock extends SlangNode {
  openBrace;

  statements;

  closeBrace;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.openBrace = ast.openBrace.text;
    this.statements = parse(ast.statements, parse, this.nextChildOffset);
    this.closeBrace = ast.closeBrace.text;
    this.initiateLoc(ast);
  }

  print({ print }) {
    return [this.openBrace, print.call(print, 'statements'), this.closeBrace];
  }
}
