import { printComparisonOperation } from '../slang-printers/print-comparison-operation.js';
import { SlangNode } from './SlangNode.js';

export class ComparisonExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print, options) {
    return printComparisonOperation({ node: this, path, print, options });
  }
}
