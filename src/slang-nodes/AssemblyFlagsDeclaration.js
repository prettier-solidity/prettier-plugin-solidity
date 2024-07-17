import { SlangNode } from './SlangNode.js';
import { AssemblyFlags } from './AssemblyFlags.js';

export class AssemblyFlagsDeclaration extends SlangNode {
  openParen;

  flags;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openParen: ast.openParen.text,
      flags: new AssemblyFlags(
        ast.flags,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'flags'), this.closeParen];
  }
}
