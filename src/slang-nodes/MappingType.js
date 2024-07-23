import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { MappingKey } from './MappingKey.js';
import { MappingValue } from './MappingValue.js';

export class MappingType extends SlangNode {
  get kind() {
    return NonterminalKind.MappingType;
  }

  mappingKeyword;

  openParen;

  keyType;

  equalGreaterThan;

  valueType;

  closeParen;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      mappingKeyword: ast.mappingKeyword.text,
      openParen: ast.openParen.text,
      keyType: new MappingKey(ast.keyType, offsets[0], options),
      equalGreaterThan: ast.equalGreaterThan.text,
      valueType: new MappingValue(ast.valueType, offsets[1], options),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch);
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
