import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { Statements } from './Statements.js';

export class Block extends SlangNode {
  get kind() {
    return NonterminalKind.Block;
  }

  openBrace;

  statements;

  closeBrace;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      openBrace: ast.openBrace.text,
      statements: new Statements(ast.statements, offsets[0], options),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'statements'), this.closeBrace];
  }
}
