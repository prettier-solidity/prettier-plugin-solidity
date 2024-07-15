import { SlangNode } from './SlangNode.js';

export class PrefixExpression extends SlangNode {
  operator;

  operand;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [this.operator, path.call(print, 'operand')];
  }
}
