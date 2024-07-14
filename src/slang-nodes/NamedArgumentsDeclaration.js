import { SlangNode } from './SlangNode.js';

export class NamedArgumentsDeclaration extends SlangNode {
  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.openParen = ast.openParen.text;
    if (ast.arguments) {
      this.arguments = parse(ast.arguments, this.nextChildOffset);
    }
    this.closeParen = ast.closeParen.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      this.openParen,
      this.arguments ? path.call(print, 'arguments') : '',
      this.closeParen
    ];
  }
}
