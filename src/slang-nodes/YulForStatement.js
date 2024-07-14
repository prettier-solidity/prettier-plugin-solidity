import { SlangNode } from './SlangNode.js';

export class YulForStatement extends SlangNode {
  forKeyword;

  initialization;

  condition;

  iterator;

  body;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      `${this.forKeyword} `,
      path.call(print, 'initialization'),
      ' ',
      path.call(print, 'condition'),
      ' ',
      path.call(print, 'iterator'),
      ' ',
      path.call(print, 'body')
    ];
  }
}
