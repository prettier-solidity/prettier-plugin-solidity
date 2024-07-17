import { SlangNode } from './SlangNode.js';
import { ImportAlias } from './ImportAlias.js';
import { StringLiteral } from './StringLiteral.js';

export class NamedImport extends SlangNode {
  asterisk;

  alias;

  fromKeyword;

  path;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { asterisk, alias, fromKeyword, path } = ast;
      this.asterisk = asterisk.text;
      this.alias = new ImportAlias(
        alias,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.fromKeyword = fromKeyword.text;
      this.path = new StringLiteral(
        path,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
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
