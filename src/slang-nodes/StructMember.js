import { SlangNode } from './SlangNode.js';

export class StructMember extends SlangNode {
  typeName;

  name;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [path.call(print, 'typeName'), ` ${this.name}${this.semicolon}`];
  }
}
