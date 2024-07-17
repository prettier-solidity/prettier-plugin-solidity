import { SlangNode } from './SlangNode.js';

export class ThrowStatement extends SlangNode {
  throwKeyword;

  semicolon;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => ({
      throwKeyword: ast.throwKeyword.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: ThrowStatement'];
  }
}
