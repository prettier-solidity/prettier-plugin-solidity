import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

const tryToHug = createHugFunction([
  '+',
  '-',
  '*',
  '/',
  '**',
  '<<',
  '>>',
  '&',
  '^'
]);

export class BitwiseOrExpression extends SlangNode {
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

    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
  }

  print(path, print, options) {
    return printBinaryOperation({ node: this, path, print, options });
  }
}
