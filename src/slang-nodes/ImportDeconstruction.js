import { SlangNode } from './SlangNode.js';

export class ImportDeconstruction extends SlangNode {
  openBrace;

  symbols;

  closeBrace;

  fromKeyword;

  path;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      this.openBrace,
      path.call(print, 'symbols'),
      `${this.closeBrace} ${this.fromKeyword} `,
      path.call(print, 'path')
    ];
  }
}
