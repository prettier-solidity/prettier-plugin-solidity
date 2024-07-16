import { SlangNode } from './SlangNode.js';

export class UncheckedBlock extends SlangNode {
  uncheckedKeyword;

  block;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [`${this.uncheckedKeyword} `, path.call(print, 'block')];
  }
}
