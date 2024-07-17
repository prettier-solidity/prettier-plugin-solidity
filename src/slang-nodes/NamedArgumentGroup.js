import { SlangNode } from './SlangNode.js';
import { NamedArguments } from './NamedArguments.js';

export class NamedArgumentGroup extends SlangNode {
  openBrace;

  arguments;

  closeBrace;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openBrace: ast.openBrace.text,
      arguments: new NamedArguments(
        ast.arguments,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'arguments'), this.closeBrace];
  }
}
