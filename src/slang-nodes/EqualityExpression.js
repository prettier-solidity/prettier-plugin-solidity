import { printComparisonOperation } from '../slang-printers/print-comparison-operation.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class EqualityExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      leftOperand: new Expression(
        ast.leftOperand,
        childrenOffsets.shift(),
        comments,
        options
      ),
      operator: ast.operator.text,
      rightOperand: new Expression(
        ast.rightOperand,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print, options) {
    return printComparisonOperation({ node: this, path, print, options });
  }
}
