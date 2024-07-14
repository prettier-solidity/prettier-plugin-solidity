import { logicalOperationPrint } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class AndExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print, options) {
    return logicalOperationPrint({ node: this, path, print, options });
  }
}
