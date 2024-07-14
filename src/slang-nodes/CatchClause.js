import { SlangNode } from './SlangNode.js';

export class CatchClause extends SlangNode {
  catchKeyword;

  error;

  body;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.catchKeyword = ast.catchKeyword.text;
    if (ast.error) {
      this.error = parse(ast.error, this.nextChildOffset);
    }
    this.body = parse(ast.body, this.nextChildOffset);
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      `${this.catchKeyword} `,
      this.error ? path.call(print, 'error') : '',
      path.call(print, 'body')
    ];
  }
}
