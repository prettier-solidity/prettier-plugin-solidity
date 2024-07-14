import { SlangNode } from './SlangNode.js';

export class MappingKey extends SlangNode {
  keyType;

  name;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [path.call(print, 'keyType'), this.name ? ` ${this.name}` : ''];
  }
}
