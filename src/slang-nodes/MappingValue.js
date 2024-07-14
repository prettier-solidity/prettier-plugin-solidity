import { SlangNode } from './SlangNode.js';

export class MappingValue extends SlangNode {
  typeName;

  name;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [path.call(print, 'typeName'), this.name ? ` ${this.name}` : ''];
  }
}
