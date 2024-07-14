import { SlangNode } from './SlangNode.js';

export class AssemblyFlagsDeclaration extends SlangNode {
  openParen;

  flags;

  closeParen;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'flags'), this.closeParen];
  }
}
