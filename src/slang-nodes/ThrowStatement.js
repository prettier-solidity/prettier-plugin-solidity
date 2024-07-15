import { SlangNode } from './SlangNode.js';

export class ThrowStatement extends SlangNode {
  throwKeyword;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: ThrowStatement'];
  }
}
