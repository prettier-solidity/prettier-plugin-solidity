import { SlangNode } from './SlangNode.js';

export class UncheckedBlock extends SlangNode {
  uncheckedKeyword;

  block;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [`${this.uncheckedKeyword} `, path.call(print, 'block')];
  }
}
