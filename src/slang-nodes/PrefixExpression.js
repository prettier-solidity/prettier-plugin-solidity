import { SlangNode } from './SlangNode.js';

export class PrefixExpression extends SlangNode {
  operator;

  operand;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.operator = ast.operator.text;
    this.operand = parse(ast.operand, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [this.operator, path.call(print, 'operand')];
  }
}
