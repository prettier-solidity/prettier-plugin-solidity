import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { YulStatements } from './YulStatements.js';

export class YulBlock extends SlangNode {
  get kind() {
    return NonterminalKind.YulBlock;
  }

  openBrace;

  statements;

  closeBrace;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      openBrace: ast.openBrace.text,
      statements: new YulStatements(ast.statements, offsets[0], options),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'statements'), this.closeBrace];
  }
}
