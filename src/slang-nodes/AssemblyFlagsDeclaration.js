import { SlangNode } from './SlangNode.js';
import { AssemblyFlags } from './AssemblyFlags.js';

export class AssemblyFlagsDeclaration extends SlangNode {
  openParen;

  flags;

  closeParen;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openParen: ast.openParen.text,
      flags: new AssemblyFlags(ast.flags, childrenOffsets.shift(), options),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'flags'), this.closeParen];
  }
}
