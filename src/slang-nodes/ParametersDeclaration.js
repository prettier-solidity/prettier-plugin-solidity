import { SlangNode } from './SlangNode.js';

export class ParametersDeclaration extends SlangNode {
  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    if (offset) {
      this.openParen = ast.openParen.text;
      this.parameters = parse(ast.parameters, this.nextChildOffset);
      this.closeParen = ast.closeParen.text;
      this.initiateLoc(ast);
    } else {
      this.kind = ast.kind;
      this.loc = ast.loc;
      this.openParen = ast.openParen;
      this.parameters = ast.parameters;
      this.closeParen = ast.closeParen;
    }
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
