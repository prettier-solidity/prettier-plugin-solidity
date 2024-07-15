import { SlangNode } from './SlangNode.js';

export class UsingDirective extends SlangNode {
  usingKeyword;

  clause;

  forKeyword;

  target;

  globalKeyword;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      `${this.usingKeyword} `,
      path.call(print, 'clause'),
      ` ${this.forKeyword} `,
      path.call(print, 'target'),
      `${this.globalKeyword ? ` ${this.globalKeyword}` : ''}${this.semicolon}`
    ];
  }
}
