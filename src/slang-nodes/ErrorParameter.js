import { SlangNode } from './SlangNode.js';

export class ErrorParameter extends SlangNode {
  typeName;

  name;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [path.call(print, 'typeName'), this.name ? ` ${this.name}` : ''];
  }
}
