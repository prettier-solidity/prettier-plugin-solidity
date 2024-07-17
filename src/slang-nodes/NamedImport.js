import { SlangNode } from './SlangNode.js';
import { ImportAlias } from './ImportAlias.js';
import { StringLiteral } from './StringLiteral.js';

export class NamedImport extends SlangNode {
  asterisk;

  alias;

  fromKeyword;

  path;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      asterisk: ast.asterisk.text,
      alias: new ImportAlias(
        ast.alias,
        childrenOffsets.shift(),
        comments,
        options
      ),
      fromKeyword: ast.fromKeyword.text,
      path: new StringLiteral(
        ast.path,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      this.asterisk,
      path.call(print, 'alias'),
      ` ${this.fromKeyword} `,
      path.call(print, 'path')
    ];
  }
}
