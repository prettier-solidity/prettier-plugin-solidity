import { SlangNode } from './SlangNode.js';

export class CallOptionsExpression extends SlangNode {
  operand;

  openBrace;

  options;

  closeBrace;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.operand = parse(ast.operand, parse, this.nextChildOffset);
    this.openBrace = ast.openBrace.text;
    this.options = parse(ast.options, parse, this.nextChildOffset);
    this.closeBrace = ast.closeBrace.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'operand'),
      this.openBrace,
      path.call(print, 'options'),
      this.closeBrace
    ];
  }
}
