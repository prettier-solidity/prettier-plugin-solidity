import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

const tryToHug = createHugFunction(['&&']);

export class OrExpression extends SlangNode {
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

    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
  }

  print(path, print, options) {
    return printLogicalOperation({ node: this, path, print, options });
  }
}
