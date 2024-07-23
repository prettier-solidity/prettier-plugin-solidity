import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { Expression } from './Expression.js';

export class ConstantDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.ConstantDefinition;
  }

  typeName;

  constantKeyword;

  name;

  equal;

  value;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      typeName: new TypeName(ast.typeName, offsets[0], options),
      constantKeyword: ast.constantKeyword.text,
      name: ast.name.text,
      equal: ast.equal.text,
      value: new Expression(ast.value, offsets[1], options),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: ConstantDefinition'];
  }
}
