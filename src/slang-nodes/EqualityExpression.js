import { comparisonOperationPrint } from '../common/slang-helpers.js';
import { SlangNode } from './SlangNode.js';

export class EqualityExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print, options) {
    return comparisonOperationPrint({ node: this, path, print, options });
  }
}
