import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

const tryToHugLeftOperand = createHugFunction([
  '+',
  '-',
  '*',
  '/',
  '**',
  '<<',
  '>>'
]);
const tryToHugRightOperand = createHugFunction(['+', '-', '*', '/', '**']);

export class ShiftExpression extends SlangNode {
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

    this.leftOperand = tryToHugLeftOperand(this.leftOperand);
    this.rightOperand = tryToHugRightOperand(this.rightOperand);
  }

  print(path, print, options) {
    return printBinaryOperation({ node: this, path, print, options });
  }
}
