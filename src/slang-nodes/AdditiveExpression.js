import { binaryOperationPrint } from '../common/slang-helpers.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';

const tryToHug = createHugFunction(['%']);

export class AdditiveExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.leftOperand = tryToHug(parse(ast.leftOperand, this.nextChildOffset));
    this.operator = ast.operator.text;
    this.rightOperand = tryToHug(parse(ast.rightOperand, this.nextChildOffset));
    this.initiateLoc(ast);
  }

  print(path, print, options) {
    return binaryOperationPrint({ node: this, path, print, options });
  }
}
