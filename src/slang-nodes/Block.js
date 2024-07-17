import { SlangNode } from './SlangNode.js';
import { Statements } from './Statements.js';

export class Block extends SlangNode {
  openBrace;

  statements;

  closeBrace;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openBrace, statements, closeBrace } = ast;
      this.openBrace = openBrace.text;
      this.statements = new Statements(
        statements,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.closeBrace = closeBrace.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'statements'), this.closeBrace];
  }
}
