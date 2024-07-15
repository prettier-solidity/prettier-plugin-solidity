import { SlangNode } from './SlangNode.js';

export class MappingType extends SlangNode {
  mappingKeyword;

  openParen;

  keyType;

  equalGreaterThan;

  valueType;

  closeParen;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
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
