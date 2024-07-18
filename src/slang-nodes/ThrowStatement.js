import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';

export class ThrowStatement extends SlangNode {
  get kind() {
    return NonterminalKind.ThrowStatement;
  }

  throwKeyword;

  semicolon;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      throwKeyword: ast.throwKeyword.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: ThrowStatement'];
  }
}
