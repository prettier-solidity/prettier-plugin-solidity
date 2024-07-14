import { binaryOperationPrint } from '../common/slang-helpers.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';

const multiplicationTryToHug = createHugFunction(['/', '%']);
const divisionTryToHug = createHugFunction(['*', '%']);
const moduloTryToHug = createHugFunction(['*', '/', '%']);

export class MultiplicativeExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);

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

    this.initializeLoc(ast);
  }

  print(path, print, options) {
    return binaryOperationPrint({ node: this, path, print, options });
  }
}
