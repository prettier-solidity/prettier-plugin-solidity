import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class PostfixExpression extends SlangNode {
  operand;

  operator;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      operand: new Expression(
        ast.operand,
        childrenOffsets.shift(),
        comments,
        options
      ),
      operator: ast.operator.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [path.call(print, 'operand'), this.operator];
  }
}
