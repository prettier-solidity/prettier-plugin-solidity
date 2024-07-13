import { SlangNode } from './SlangNode.js';

export class ParametersDeclaration extends SlangNode {
  openParen;

  parameters;

  closeParen;

  constructor({
    ast,
    parse,
    offset,
    kind,
    loc,
    openParen,
    parameters,
    closeParen
  }) {
    super(ast, offset);
    if (ast) {
      this.openParen = ast.openParen.text;
      this.parameters = parse(ast.parameters, parse, this.nextChildOffset);
      this.closeParen = ast.closeParen.text;
      this.initiateLoc(ast);
    } else {
      this.kind = kind;
      this.loc = loc;
      this.openParen = openParen;
      this.parameters = parameters;
      this.closeParen = closeParen;
    }
  }

  print({ path, print }) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
