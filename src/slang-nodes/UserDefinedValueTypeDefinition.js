import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';

export class UserDefinedValueTypeDefinition extends SlangNode {
  typeKeyword;

  name;

  isKeyword;

  valueType;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      typeKeyword: ast.typeKeyword.text,
      name: ast.name.text,
      isKeyword: ast.isKeyword.text,
      valueType: new ElementaryType(
        ast.valueType,
        childrenOffsets.shift(),
        comments,
        options
      ),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [
      `${this.typeKeyword} ${this.name} ${this.isKeyword} `,
      path.call(print, 'valueType'),
      this.semicolon
    ];
  }
}
