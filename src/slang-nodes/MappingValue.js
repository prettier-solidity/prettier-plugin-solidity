import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class MappingValue extends SlangNode {
  get kind() {
    return NonterminalKind.MappingValue;
  }

  typeName;

  name;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      typeName: new TypeName(ast.typeName, childrenOffsets.shift(), options),
      name: ast.name?.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [path.call(print, 'typeName'), this.name ? ` ${this.name}` : ''];
  }
}
