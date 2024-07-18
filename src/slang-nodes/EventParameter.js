import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class EventParameter extends SlangNode {
  get kind() {
    return NonterminalKind.EventParameter;
  }

  typeName;

  indexedKeyword;

  name;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      typeName: new TypeName(ast.typeName, childrenOffsets.shift(), options),
      indexedKeyword: ast.indexedKeyword?.text,
      name: ast.name?.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      this.indexedKeyword ? ` ${this.indexedKeyword}` : '',
      this.name ? ` ${this.name}` : ''
    ];
  }
}
