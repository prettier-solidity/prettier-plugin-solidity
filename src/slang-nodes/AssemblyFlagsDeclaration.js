import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { AssemblyFlags } from './AssemblyFlags.js';

export class AssemblyFlagsDeclaration extends SlangNode {
  get kind() {
    return NonterminalKind.AssemblyFlagsDeclaration;
  }

  openParen;

  flags;

  closeParen;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      openParen: ast.openParen.text,
      flags: new AssemblyFlags(ast.flags, offsets[0], options),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'flags'), this.closeParen];
  }
}
