import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';

export class ImportAlias extends SlangNode {
  get kind() {
    return NonterminalKind.ImportAlias;
  }

  asKeyword;

  identifier;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      asKeyword: ast.asKeyword.text,
      identifier: ast.identifier.text
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return ` ${this.asKeyword} ${this.identifier}`;
  }
}
