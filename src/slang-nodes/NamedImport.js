import { SlangNode } from './SlangNode.js';

export class NamedImport extends SlangNode {
  asterisk;

  alias;

  fromKeyword;

  path;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
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
