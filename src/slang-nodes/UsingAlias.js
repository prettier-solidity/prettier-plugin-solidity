import { SlangNode } from './SlangNode.js';

export class UsingAlias extends SlangNode {
  asKeyword;

  operator;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [` ${this.asKeyword} `, path.call(print, 'operator')];
  }
}
