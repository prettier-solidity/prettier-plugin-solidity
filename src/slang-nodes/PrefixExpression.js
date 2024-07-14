import { SlangNode } from './SlangNode.js';

export class PrefixExpression extends SlangNode {
  operator;

  operand;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.operator = ast.operator.text;
    this.operand = parse(ast.operand, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [this.operator, path.call(print, 'operand')];
  }
}
