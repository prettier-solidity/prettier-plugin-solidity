import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { SlangNode } from './SlangNode.js';

export class AndExpression extends SlangNode {
  leftOperand;

  operator;

  rightOperand;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print, options) {
    return printLogicalOperation({ node: this, path, print, options });
  }
}
