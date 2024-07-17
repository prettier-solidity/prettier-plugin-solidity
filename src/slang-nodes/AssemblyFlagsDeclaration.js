import { SlangNode } from './SlangNode.js';
import { AssemblyFlags } from './AssemblyFlags.js';

export class AssemblyFlagsDeclaration extends SlangNode {
  openParen;

  flags;

  closeParen;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openParen, flags, closeParen } = ast;
      this.openParen = openParen.text;
      this.flags = new AssemblyFlags(
        flags,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.closeParen = closeParen.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'flags'), this.closeParen];
  }
}
