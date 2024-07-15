import { SlangNode } from './SlangNode.js';

export class NamedArgumentsDeclaration extends SlangNode {
  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      this.openParen,
      this.arguments ? path.call(print, 'arguments') : '',
      this.closeParen
    ];
  }
}
