import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { StateVariableAttributes } from './StateVariableAttributes.js';
import { StateVariableDefinitionValue } from './StateVariableDefinitionValue.js';

export class StateVariableDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.StateVariableDefinition;
  }

  typeName;

  attributes;

  name;

  value;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      typeName: new TypeName(ast.typeName, offsets[0], options),
      attributes: new StateVariableAttributes(
        ast.attributes,
        offsets[1],
        options
      ),
      name: ast.name.text,
      value: ast.value
        ? new StateVariableDefinitionValue(ast.value, offsets[2], options)
        : undefined,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      path.call(print, 'typeName'),
      path.call(print, 'attributes'),
      ` ${this.name}`,
      this.value ? path.call(print, 'value') : '',
      this.semicolon
    ];
  }
}
