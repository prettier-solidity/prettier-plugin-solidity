import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { NamedArguments } from './NamedArguments.js';

export class NamedArgumentGroup extends SlangNode {
  get kind() {
    return NonterminalKind.NamedArgumentGroup;
  }

  openBrace;

  arguments;

  closeBrace;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      openBrace: ast.openBrace.text,
      arguments: new NamedArguments(ast.arguments, offsets[0], options),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'arguments'), this.closeBrace];
  }
}
