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

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      typeName: new TypeName(
        ast.typeName,
        childrenOffsets.shift(),
        comments,
        options
      ),
      attributes: new StateVariableAttributes(
        ast.attributes,
        childrenOffsets.shift(),
        comments,
        options
      ),
      name: ast.name.text,
      value: ast.value
        ? new StateVariableDefinitionValue(
            ast.value,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch, comments);
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
