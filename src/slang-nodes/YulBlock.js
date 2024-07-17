import { SlangNode } from './SlangNode.js';
import { YulStatements } from './YulStatements.js';

export class YulBlock extends SlangNode {
  openBrace;

  statements;

  closeBrace;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openBrace: ast.openBrace.text,
      statements: new YulStatements(
        ast.statements,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'statements'), this.closeBrace];
  }
}
