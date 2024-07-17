import { printComparisonOperation } from '../slang-printers/print-comparison-operation.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class EqualityExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { leftOperand, operator, rightOperand } = ast;
      this.leftOperand = new Expression(
        leftOperand,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.operator = operator.text;
      this.rightOperand = new Expression(
        rightOperand,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print, options) {
    return printComparisonOperation({ node: this, path, print, options });
  }
}
