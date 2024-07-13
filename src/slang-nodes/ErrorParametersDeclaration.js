import { SlangNode } from './SlangNode.js';

export class ErrorParametersDeclaration extends SlangNode {
  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.openParen = ast.openParen.text;
    this.parameters = parse(ast.parameters, parse, this.nextChildOffset);
    this.closeParen = ast.closeParen.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
