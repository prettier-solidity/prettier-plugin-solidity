import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class PrefixExpression extends SlangNode {
  operator;

  operand;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      operator: ast.operator.text,
      operand: new Expression(ast.operand, childrenOffsets.shift(), options)
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.operator, path.call(print, 'operand')];
  }
}
