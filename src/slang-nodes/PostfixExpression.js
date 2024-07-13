import { SlangNode } from './SlangNode.js';

export class PostfixExpression extends SlangNode {
  operand;

  operator;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.operand = parse(ast.operand, parse, this.nextChildOffset);
    this.operator = ast.operator.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [path.call(print, 'operand'), this.operator];
  }
}
