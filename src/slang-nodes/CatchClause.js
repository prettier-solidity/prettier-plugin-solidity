import { SlangNode } from './SlangNode.js';

export class CatchClause extends SlangNode {
  catchKeyword;

  error;

  body;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      `${this.catchKeyword} `,
      this.error ? path.call(print, 'error') : '',
      path.call(print, 'body')
    ];
  }
}
