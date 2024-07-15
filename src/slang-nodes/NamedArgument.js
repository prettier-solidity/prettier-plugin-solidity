import { SlangNode } from './SlangNode.js';

export class NamedArgument extends SlangNode {
  name;

  colon;

  value;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [`${this.name}${this.colon} `, path.call(print, 'value')];
  }
}
