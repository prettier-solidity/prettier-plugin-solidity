import { SlangNode } from './SlangNode.js';
import { YulStatements } from './YulStatements.js';

export class YulBlock extends SlangNode {
  openBrace;

  statements;

  closeBrace;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openBrace: ast.openBrace.text,
      statements: new YulStatements(
        ast.statements,
        childrenOffsets.shift(),
        options
      ),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'statements'), this.closeBrace];
  }
}
