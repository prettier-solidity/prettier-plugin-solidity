import { SlangNode } from './SlangNode.js';

export class YulFunctionCallExpression extends SlangNode {
  operand;

  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      path.call(print, 'operand'),
      this.openParen,
      path.call(print, 'arguments'),
      this.closeParen
    ];
  }
}
