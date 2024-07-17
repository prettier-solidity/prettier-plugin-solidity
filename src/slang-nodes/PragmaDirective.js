import { SlangNode } from './SlangNode.js';
import { Pragma } from './Pragma.js';

export class PragmaDirective extends SlangNode {
  pragmaKeyword;

  pragma;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { pragmaKeyword, pragma, semicolon } = ast;
      this.pragmaKeyword = pragmaKeyword.text;
      this.pragma = new Pragma(
        pragma,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      `${this.pragmaKeyword} `,
      path.call(print, 'pragma'),
      this.semicolon
    ];
  }
}
