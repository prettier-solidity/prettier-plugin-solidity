import { SlangNode } from './SlangNode.js';

export class StateVariableDefinition extends SlangNode {
  typeName;

  attributes;

  name;

  value;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
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
