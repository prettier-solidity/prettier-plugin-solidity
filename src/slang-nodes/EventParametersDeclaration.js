import { SlangNode } from './SlangNode.js';

export class EventParametersDeclaration extends SlangNode {
  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
