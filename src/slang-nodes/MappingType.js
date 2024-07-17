import { SlangNode } from './SlangNode.js';
import { MappingKey } from './MappingKey.js';
import { MappingValue } from './MappingValue.js';

export class MappingType extends SlangNode {
  mappingKeyword;

  openParen;

  keyType;

  equalGreaterThan;

  valueType;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      mappingKeyword: ast.mappingKeyword.text,
      openParen: ast.openParen.text,
      keyType: new MappingKey(
        ast.keyType,
        childrenOffsets.shift(),
        comments,
        options
      ),
      equalGreaterThan: ast.equalGreaterThan.text,
      valueType: new MappingValue(
        ast.valueType,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch, comments);
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
