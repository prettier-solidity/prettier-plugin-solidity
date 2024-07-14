import { binaryOperationPrint } from '../common/slang-helpers.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';

const tryToHug = createHugFunction(['+', '-', '*', '/', '**', '<<', '>>', '&']);

export class BitwiseXorExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
    this.initializeLoc(ast);
  }

  print(path, print, options) {
    return binaryOperationPrint({ node: this, path, print, options });
  }
}
