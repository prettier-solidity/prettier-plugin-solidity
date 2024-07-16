import { SlangNode } from './SlangNode.js';

export class ArrayTypeName extends SlangNode {
  operand;

  openBracket;

  index;

  closeBracket;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      path.call(print, 'operand'),
      this.openBracket,
      this.index ? path.call(print, 'index') : '',
      this.closeBracket
    ];
  }
}
