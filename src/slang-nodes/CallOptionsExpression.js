import { SlangNode } from './SlangNode.js';

export class CallOptionsExpression extends SlangNode {
  operand;

  openBrace;

  options;

  closeBrace;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      path.call(print, 'operand'),
      this.openBrace,
      path.call(print, 'options'),
      this.closeBrace
    ];
  }
}
