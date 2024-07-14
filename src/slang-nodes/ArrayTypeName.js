import { SlangNode } from './SlangNode.js';

export class ArrayTypeName extends SlangNode {
  operand;

  openBracket;

  index;

  closeBracket;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.operand = parse(ast.operand, this.nextChildOffset);
    this.openBracket = ast.openBracket.text;
    if (ast.index) {
      this.index = parse(ast.index, this.nextChildOffset);
    }
    this.closeBracket = ast.closeBracket.text;
    this.initiateLoc(ast);
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
