import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { SlangNode } from './SlangNode.js';

export class AndExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print, options) {
    return printLogicalOperation({ node: this, path, print, options });
  }
}
