import { SlangNode } from './SlangNode.js';

export class YulIfStatement extends SlangNode {
  ifKeyword;

  condition;

  body;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      `${this.ifKeyword} `,
      path.call(print, 'condition'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
