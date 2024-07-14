import { SlangNode } from './SlangNode.js';

export class YulBlock extends SlangNode {
  openBrace;

  statements;

  closeBrace;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [this.openBrace, path.call(print, 'statements'), this.closeBrace];
  }
}
