import { SlangNode } from './SlangNode.js';

export class MappingType extends SlangNode {
  mappingKeyword;

  openParen;

  keyType;

  equalGreaterThan;

  valueType;

  closeParen;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initializeChildrenKeys();
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [
      `${this.mappingKeyword}${this.openParen}`,
      path.call(print, 'keyType'),
      ` ${this.equalGreaterThan} `,
      path.call(print, 'valueType'),
      this.closeParen
    ];
  }
}
