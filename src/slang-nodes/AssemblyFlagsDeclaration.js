import { SlangNode } from './SlangNode.js';

export class AssemblyFlagsDeclaration extends SlangNode {
  openParen;

  flags;

  closeParen;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.openParen = ast.openParen.text;
    this.flags = parse(ast.flags, this.nextChildOffset);
    this.closeParen = ast.closeParen.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'flags'), this.closeParen];
  }
}
