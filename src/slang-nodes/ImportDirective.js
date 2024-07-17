import { SlangNode } from './SlangNode.js';
import { ImportClause } from './ImportClause.js';

export class ImportDirective extends SlangNode {
  importKeyword;

  clause;

  semicolon;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { importKeyword, clause, semicolon } = ast;
      this.importKeyword = importKeyword.text;
      this.clause = new ImportClause(
        clause,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [
      `${this.importKeyword} `,
      path.call(print, 'clause'),
      this.semicolon
    ];
  }
}
