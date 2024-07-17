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

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const {
        mappingKeyword,
        openParen,
        keyType,
        equalGreaterThan,
        valueType,
        closeParen
      } = ast;
      this.mappingKeyword = mappingKeyword.text;
      this.openParen = openParen.text;
      this.keyType = new MappingKey(
        keyType,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.equalGreaterThan = equalGreaterThan.text;
      this.valueType = new MappingValue(
        valueType,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.closeParen = closeParen.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
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
