import { SlangNode } from './SlangNode.js';

export class TypedTupleMember extends SlangNode {
  typeName;

  storageLocation;

  name;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.storageLocation ? [' ', path.call(print, 'storageLocation')] : '',
      ` ${this.name}`
    ];
  }
}
