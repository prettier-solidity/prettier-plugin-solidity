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

    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
  }

  print(path, print, options) {
    return printLogicalOperation({ node: this, path, print, options });
  }
}
