import { SlangNode } from './SlangNode.js';

export class UserDefinedValueTypeDefinition extends SlangNode {
  typeKeyword;

  name;

  isKeyword;

  valueType;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      `${this.typeKeyword} ${this.name} ${this.isKeyword} `,
      path.call(print, 'valueType'),
      this.semicolon
    ];
  }
}
