import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

const multiplicationTryToHug = createHugFunction(['/', '%']);
const divisionTryToHug = createHugFunction(['*', '%']);
const moduloTryToHug = createHugFunction(['*', '/', '%']);

export class MultiplicativeExpression extends SlangNode {
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

    this.initialize(ast, offset, fetch, comments);

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
  }

  print(path, print, options) {
    return printBinaryOperation({ node: this, path, print, options });
  }
}
