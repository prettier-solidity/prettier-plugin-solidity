import { SlangNode } from './SlangNode.js';
import { NamedArguments } from './NamedArguments.js';

export class NamedArgumentGroup extends SlangNode {
  openBrace;

  arguments;

  closeBrace;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openBrace, closeBrace } = ast;
      this.openBrace = openBrace.text;
      this.arguments = new NamedArguments(
        ast.arguments,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );

      this.closeBrace = closeBrace.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'arguments'), this.closeBrace];
  }
}
