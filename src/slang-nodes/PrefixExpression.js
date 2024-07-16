import { SlangNode } from './SlangNode.js';

export class PrefixExpression extends SlangNode {
  operator;

  operand;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [this.operator, path.call(print, 'operand')];
  }
}
