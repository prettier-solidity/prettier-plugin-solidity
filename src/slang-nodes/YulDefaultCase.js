import { SlangNode } from './SlangNode.js';

export class YulDefaultCase extends SlangNode {
  defaultKeyword;

  body;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [`${this.defaultKeyword} `, path.call(print, 'body')];
  }
}
