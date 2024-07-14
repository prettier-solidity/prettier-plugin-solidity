import { SlangNode } from './SlangNode.js';

export class StateVariableDefinition extends SlangNode {
  typeName;

  attributes;

  name;

  value;

  semicolon;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.typeName = parse(ast.typeName, this.nextChildOffset);
    this.attributes = parse(ast.attributes, this.nextChildOffset);
    this.name = ast.name.text;
    if (ast.value) {
      this.value = parse(ast.value, this.nextChildOffset);
    }
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
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
