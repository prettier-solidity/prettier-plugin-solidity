import { comparisonOperationPrint } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class ComparisonExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print, options) {
    return comparisonOperationPrint({ node: this, path, print, options });
  }
}
