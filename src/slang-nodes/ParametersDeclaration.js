import { SlangNode } from './SlangNode.js';

export class ParametersDeclaration extends SlangNode {
  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    if (offset) {
      this.initialize(ast, parse);
      this.finalize(ast);
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
