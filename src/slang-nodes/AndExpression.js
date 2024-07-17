import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

export class AndExpression extends SlangNode {
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
    return printLogicalOperation({ node: this, path, print, options });
  }
}
