import { SlangNode } from './SlangNode.js';

export class MappingKey extends SlangNode {
  keyType;

  name;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [path.call(print, 'keyType'), this.name ? ` ${this.name}` : ''];
  }
}
