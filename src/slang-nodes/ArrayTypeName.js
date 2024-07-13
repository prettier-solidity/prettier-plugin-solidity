import { SlangNode } from './SlangNode.js';

export class ArrayTypeName extends SlangNode {
  operand;

  openBracket;

  index;

  closeBracket;

  constructor({ ast, parse, offset, options }) {
    super(ast, offset);
    this.operand = parse(ast.operand, parse, this.nextChildOffset);
    this.openBracket = ast.openBracket.text;
    this.index = ast.index
      ? parse(ast.index, parse, this.nextChildOffset)
      : undefined;
    this.closeBracket = ast.closeBracket.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      path.call(print, 'operand'),
      this.openBracket,
      this.index ? path.call(print, 'index') : '',
      this.closeBracket
    ];
  }
}
