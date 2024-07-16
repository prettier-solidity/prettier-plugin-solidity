import { SlangNode } from './SlangNode.js';

export class PragmaDirective extends SlangNode {
  pragmaKeyword;

  pragma;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      `${this.pragmaKeyword} `,
      path.call(print, 'pragma'),
      this.semicolon
    ];
  }
}
