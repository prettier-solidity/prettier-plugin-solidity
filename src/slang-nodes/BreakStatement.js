import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';

export class BreakStatement extends SlangNode {
  get kind() {
    return NonterminalKind.BreakStatement;
  }

  breakKeyword;

  semicolon;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      breakKeyword: ast.breakKeyword.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return `${this.breakKeyword}${this.semicolon}`;
  }
}
