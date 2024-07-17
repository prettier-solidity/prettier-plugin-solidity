import { SlangNode } from './SlangNode.js';
import { NamedArgumentGroup } from './NamedArgumentGroup.js';

export class NamedArgumentsDeclaration extends SlangNode {
  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openParen: ast.openParen.text,
      arguments: ast.arguments
        ? new NamedArgumentGroup(
            ast.arguments,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      this.openParen,
      this.arguments ? path.call(print, 'arguments') : '',
      this.closeParen
    ];
  }
}
