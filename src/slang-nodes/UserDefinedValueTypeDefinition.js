import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';

export class UserDefinedValueTypeDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.UserDefinedValueTypeDefinition;
  }

  typeKeyword;

  name;

  isKeyword;

  valueType;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      typeKeyword: ast.typeKeyword.text,
      name: ast.name.text,
      isKeyword: ast.isKeyword.text,
      valueType: new ElementaryType(ast.valueType, offsets[0], options),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.typeKeyword} ${this.name} ${this.isKeyword} `,
      path.call(print, 'valueType'),
      this.semicolon
    ];
  }
}
