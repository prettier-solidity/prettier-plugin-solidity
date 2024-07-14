import { SlangNode } from './SlangNode.js';

export class CallOptionsExpression extends SlangNode {
  operand;

  openBrace;

  options;

  closeBrace;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.operand = parse(ast.operand, this.nextChildOffset);
    this.openBrace = ast.openBrace.text;
    this.options = parse(ast.options, this.nextChildOffset);
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
