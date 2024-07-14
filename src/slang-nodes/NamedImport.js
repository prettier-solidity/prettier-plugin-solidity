import { SlangNode } from './SlangNode.js';

export class NamedImport extends SlangNode {
  asterisk;

  alias;

  fromKeyword;

  path;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
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
