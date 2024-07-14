import { SlangNode } from './SlangNode.js';

export class PostfixExpression extends SlangNode {
  operand;

  operator;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [path.call(print, 'operand'), this.operator];
  }
}
