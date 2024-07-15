import { SlangNode } from './SlangNode.js';

export class Block extends SlangNode {
  openBrace;

  statements;

  closeBrace;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'statements'), this.closeBrace];
  }
}
