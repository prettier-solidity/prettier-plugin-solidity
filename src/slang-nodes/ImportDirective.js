import { SlangNode } from './SlangNode.js';
import { ImportClause } from './ImportClause.js';

export class ImportDirective extends SlangNode {
  importKeyword;

  clause;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { importKeyword, clause, semicolon } = ast;
      this.importKeyword = importKeyword.text;
      this.clause = new ImportClause(
        clause,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      `${this.importKeyword} `,
      path.call(print, 'clause'),
      this.semicolon
    ];
  }
}
