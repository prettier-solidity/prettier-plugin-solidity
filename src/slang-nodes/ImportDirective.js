import { SlangNode } from './SlangNode.js';
import { ImportClause } from './ImportClause.js';

export class ImportDirective extends SlangNode {
  importKeyword;

  clause;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      importKeyword: ast.importKeyword.text,
      clause: new ImportClause(
        ast.clause,
        childrenOffsets.shift(),
        comments,
        options
      ),
      semicolon: ast.semicolon.text
    });

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
