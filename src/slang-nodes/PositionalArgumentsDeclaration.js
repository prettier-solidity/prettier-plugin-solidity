import { SlangNode } from './SlangNode.js';
import { PositionalArguments } from './PositionalArguments.js';

export class PositionalArgumentsDeclaration extends SlangNode {
  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openParen, closeParen } = ast;
      const $arguments = ast.arguments;
      this.openParen = openParen.text;
      this.arguments = new PositionalArguments(
        $arguments,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.closeParen = closeParen.text;
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'arguments'), this.closeParen];
  }
}
