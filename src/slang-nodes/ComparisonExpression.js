import { printComparisonOperation } from '../slang-printers/print-comparison-operation.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class ComparisonExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { leftOperand, operator, rightOperand } = ast;
      this.leftOperand = new Expression(
        leftOperand,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.operator = operator.text;
      this.rightOperand = new Expression(
        rightOperand,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print, options) {
    return printComparisonOperation({ node: this, path, print, options });
  }
}
