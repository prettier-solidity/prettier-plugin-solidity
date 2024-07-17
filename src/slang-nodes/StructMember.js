import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class StructMember extends SlangNode {
  typeName;

  name;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { typeName, name, semicolon } = ast;
      this.typeName = new TypeName(
        typeName,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.name = name.text;
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [path.call(print, 'typeName'), ` ${this.name}${this.semicolon}`];
  }
}
