import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';

export class YulContinueStatement extends SlangNode {
  get kind() {
    return NonterminalKind.YulContinueStatement;
  }

  continueKeyword;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      continueKeyword: ast.continueKeyword.text
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return this.continueKeyword;
  }
}
