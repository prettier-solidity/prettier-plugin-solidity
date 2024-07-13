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

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.leftOperand = tryToHugLeftOperand(
      parse(ast.leftOperand, parse, this.nextChildOffset)
    );
    this.operator = ast.operator.text;
    this.rightOperand = tryToHugRightOperand(
      parse(ast.rightOperand, parse, this.nextChildOffset)
    );
    this.initiateLoc(ast);
  }

  print({ path, print, options }) {
    return binaryOperationPrint({ node: this, path, print, options });
  }
}
