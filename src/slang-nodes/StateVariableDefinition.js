import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { StateVariableAttributes } from './StateVariableAttributes.js';
import { StateVariableDefinitionValue } from './StateVariableDefinitionValue.js';

export class StateVariableDefinition extends SlangNode {
  typeName;

  attributes;

  name;

  value;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      typeName: new TypeName(ast.typeName, childrenOffsets.shift(), options),
      attributes: new StateVariableAttributes(
        ast.attributes,
        childrenOffsets.shift(),
        options
      ),
      name: ast.name.text,
      value: ast.value
        ? new StateVariableDefinitionValue(
            ast.value,
            childrenOffsets.shift(),
            options
          )
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
