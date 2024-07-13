import { SlangNode } from './SlangNode.js';

export class PositionalArgumentsDeclaration extends SlangNode {
  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.openParen = ast.openParen.text;
    this.arguments = parse(ast.arguments, parse, this.nextChildOffset);
    this.closeParen = ast.closeParen.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [this.openParen, path.call(print, 'arguments'), this.closeParen];
  }
}
