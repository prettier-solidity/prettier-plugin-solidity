import { SlangNode } from './SlangNode.js';

export class NamedArgumentsDeclaration extends SlangNode {
  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, parse, options) {
    super(ast, offset);
    this.openParen = ast.openParen.text;
    this.arguments = ast.arguments
      ? parse(ast.arguments, parse, this.nextChildOffset)
      : undefined;
    this.closeParen = ast.closeParen.text;
    this.initiateLoc(ast);
  }

  print({ path, print }) {
    return [
      this.openParen,
      this.arguments ? path.call(print, 'arguments') : '',
      this.closeParen
    ];
  }
}
