import { SlangNode } from './SlangNode.js';

export class PositionalArgumentsDeclaration extends SlangNode {
  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'arguments'), this.closeParen];
  }
}
