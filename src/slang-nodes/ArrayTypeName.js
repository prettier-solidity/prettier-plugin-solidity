import { SlangNode } from './SlangNode.js';

export class ArrayTypeName extends SlangNode {
  operand;

  openBracket;

  index;

  closeBracket;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
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
