import { SlangNode } from './SlangNode.js';

export class NamedArgumentsDeclaration extends SlangNode {
  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [
      this.openParen,
      this.arguments ? path.call(print, 'arguments') : '',
      this.closeParen
    ];
  }
}
