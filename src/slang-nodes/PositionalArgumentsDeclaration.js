import { SlangNode } from './SlangNode.js';

export class PositionalArgumentsDeclaration extends SlangNode {
  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'arguments'), this.closeParen];
  }
}
