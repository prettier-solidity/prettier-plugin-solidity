import { SlangNode } from './SlangNode.js';

export class YulFunctionCallExpression extends SlangNode {
  operand;

  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
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
