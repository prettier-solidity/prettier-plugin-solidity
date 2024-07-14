import { comparisonOperationPrint } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class EqualityExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.leftOperand = parse(ast.leftOperand, this.nextChildOffset);
    this.operator = ast.operator.text;
    this.rightOperand = parse(ast.rightOperand, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print, options) {
    return comparisonOperationPrint({ node: this, path, print, options });
  }
}
