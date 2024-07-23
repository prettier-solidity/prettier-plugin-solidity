import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { CatchClauseError } from './CatchClauseError.js';
import { Block } from './Block.js';

export class CatchClause extends SlangNode {
  get kind() {
    return NonterminalKind.CatchClause;
  }

  catchKeyword;

  error;

  body;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => {
      let i = -1;
      const children = {
        catchKeyword: ast.catchKeyword.text,
        error: ast.error
          ? new CatchClauseError(ast.error, offsets[(i += 1)], options)
          : undefined,
        body: new Block(ast.body, offsets[(i += 1)], options)
      };
      return children;
    };

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.catchKeyword} `,
      this.error ? path.call(print, 'error') : '',
      path.call(print, 'body')
    ];
  }
}
