import { binaryOperationPrint } from '../common/slang-helpers.js';
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

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.leftOperand = tryToHugLeftOperand(this.leftOperand);
    this.rightOperand = tryToHugRightOperand(this.rightOperand);
    this.initializeLoc(ast);
  }

  print(path, print, options) {
    return binaryOperationPrint({ node: this, path, print, options });
  }
}
