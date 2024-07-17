import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';

export class UserDefinedValueTypeDefinition extends SlangNode {
  typeKeyword;

  name;

  isKeyword;

  valueType;

  semicolon;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { typeKeyword, name, isKeyword, valueType, semicolon } = ast;
      this.typeKeyword = typeKeyword.text;
      this.name = name.text;
      this.isKeyword = isKeyword.text;
      this.valueType = new ElementaryType(
        valueType,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [
      `${this.typeKeyword} ${this.name} ${this.isKeyword} `,
      path.call(print, 'valueType'),
      this.semicolon
    ];
  }
}
