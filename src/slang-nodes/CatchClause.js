import { SlangNode } from './SlangNode.js';
import { CatchClauseError } from './CatchClauseError.js';
import { Block } from './Block.js';

export class CatchClause extends SlangNode {
  catchKeyword;

  error;

  body;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      catchKeyword: ast.catchKeyword.text,
      error: ast.error
        ? new CatchClauseError(
            ast.error,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,
      body: new Block(ast.body, childrenOffsets.shift(), comments, options)
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      `${this.catchKeyword} `,
      this.error ? path.call(print, 'error') : '',
      path.call(print, 'body')
    ];
  }
}
