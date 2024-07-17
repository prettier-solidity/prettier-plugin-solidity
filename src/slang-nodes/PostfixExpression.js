import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class PostfixExpression extends SlangNode {
  operand;

  operator;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { operand, operator } = ast;
      this.operand = new Expression(
        operand,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.operator = operator.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [path.call(print, 'operand'), this.operator];
  }
}
