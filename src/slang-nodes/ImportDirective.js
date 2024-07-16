import { SlangNode } from './SlangNode.js';

export class ImportDirective extends SlangNode {
  importKeyword;

  clause;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      `${this.importKeyword} `,
      path.call(print, 'clause'),
      this.semicolon
    ];
  }
}
