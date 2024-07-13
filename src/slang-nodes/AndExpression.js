import { logicalOperationPrint } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class AndExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.leftOperand = parse(ast.leftOperand, parse, this.nextChildOffset);
    this.operator = ast.operator.text;
    this.rightOperand = parse(ast.rightOperand, parse, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print({ path, print, options }) {
    return logicalOperationPrint({ node: this, path, print, options });
  }
}
