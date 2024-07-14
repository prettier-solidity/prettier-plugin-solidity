import { SlangNode } from './SlangNode.js';

export class UserDefinedValueTypeDefinition extends SlangNode {
  typeKeyword;

  name;

  isKeyword;

  valueType;

  semicolon;

  constructor(ast, offset, options, parse) {
    super(ast, offset);
    this.typeKeyword = ast.typeKeyword.text;
    this.name = ast.name.text;
    this.isKeyword = ast.isKeyword.text;
    this.valueType = parse(ast.valueType, this.nextChildOffset);
    this.semicolon = ast.semicolon.text;
    this.initiateLoc(ast);
  }

  print(path, print) {
    return [
      `${this.typeKeyword} ${this.name} ${this.isKeyword} `,
      path.call(print, 'valueType'),
      this.semicolon
    ];
  }
}
