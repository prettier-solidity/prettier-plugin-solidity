import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';

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

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);

    this.leftOperand = tryToHugLeftOperand(this.leftOperand);
    this.rightOperand = tryToHugRightOperand(this.rightOperand);
  }

  print(path, print, options) {
    return printBinaryOperation({ node: this, path, print, options });
  }
}
