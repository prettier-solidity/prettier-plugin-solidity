import { SlangNode } from './SlangNode.js';

export class YulFunctionCallExpression extends SlangNode {
  operand;

  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.operand = parse(ast.operand, this.nextChildOffset);
    this.openParen = ast.openParen.text;
    this.arguments = parse(ast.arguments, this.nextChildOffset);
    this.closeParen = ast.closeParen.text;
    this.initiateLoc(ast);
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
