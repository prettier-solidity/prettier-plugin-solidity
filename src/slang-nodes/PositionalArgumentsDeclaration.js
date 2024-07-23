import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { PositionalArguments } from './PositionalArguments.js';

export class PositionalArgumentsDeclaration extends SlangNode {
  get kind() {
    return NonterminalKind.PositionalArgumentsDeclaration;
  }

  openParen;

  arguments;

  closeParen;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      openParen: ast.openParen.text,
      arguments: new PositionalArguments(ast.arguments, offsets[0], options),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'arguments'), this.closeParen];
  }
}
