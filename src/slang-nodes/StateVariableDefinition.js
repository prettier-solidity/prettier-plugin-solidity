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

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { typeName, attributes, name, value, semicolon } = ast;
      this.typeName = new TypeName(
        typeName,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.attributes = new StateVariableAttributes(
        attributes,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.name = name.text;
      if (value) {
        this.value = new StateVariableDefinitionValue(
          value,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
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
