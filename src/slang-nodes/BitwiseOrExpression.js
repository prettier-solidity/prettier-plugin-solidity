import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';

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

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);

    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
  }

  print(path, print, options) {
    return printBinaryOperation({ node: this, path, print, options });
  }
}
