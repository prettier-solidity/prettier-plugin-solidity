import { SlangNode } from './SlangNode.js';
import { PositionalArguments } from './PositionalArguments.js';

export class PositionalArgumentsDeclaration extends SlangNode {
  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openParen: ast.openParen.text,
      arguments: new PositionalArguments(
        ast.arguments,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'arguments'), this.closeParen];
  }
}
