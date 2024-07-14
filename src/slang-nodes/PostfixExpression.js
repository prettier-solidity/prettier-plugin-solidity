import { SlangNode } from './SlangNode.js';

export class PostfixExpression extends SlangNode {
  operand;

  operator;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.operand = parse(ast.operand, this.nextChildOffset);
    this.operator = ast.operator.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [path.call(print, 'operand'), this.operator];
  }
}
