import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class StructMember extends SlangNode {
  get kind() {
    return NonterminalKind.StructMember;
  }

  typeName;

  name;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      typeName: new TypeName(ast.typeName, childrenOffsets.shift(), options),
      name: ast.name.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [path.call(print, 'typeName'), ` ${this.name}${this.semicolon}`];
  }
}
