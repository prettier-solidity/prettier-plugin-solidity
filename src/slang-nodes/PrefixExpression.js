import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class PrefixExpression extends SlangNode {
  operator;

  operand;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { operator, operand } = ast;
      this.operator = operator.text;
      this.operand = new Expression(
        operand,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.operator, path.call(print, 'operand')];
  }
}
