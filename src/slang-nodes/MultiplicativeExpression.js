import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';

const multiplicationTryToHug = createHugFunction(['/', '%']);
const divisionTryToHug = createHugFunction(['*', '%']);
const moduloTryToHug = createHugFunction(['*', '/', '%']);

export class MultiplicativeExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);

    switch (this.operator) {
      case '*':
        this.leftOperand = multiplicationTryToHug(this.leftOperand);
        break;
      case '/':
        this.leftOperand = divisionTryToHug(this.leftOperand);
        break;
      case '%':
        this.leftOperand = moduloTryToHug(this.leftOperand);
        break;
      default:
        break;
    }

    this.finalize(ast);
  }

  print(path, print, options) {
    return printBinaryOperation({ node: this, path, print, options });
  }
}
