import { SlangNode } from './SlangNode.js';

export class NamedArgument extends SlangNode {
  name;

  colon;

  value;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [`${this.name}${this.colon} `, path.call(print, 'value')];
  }
}
