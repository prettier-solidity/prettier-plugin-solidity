import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class StructMember extends SlangNode {
  typeName;

  name;

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
      name: ast.name.text,
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [path.call(print, 'typeName'), ` ${this.name}${this.semicolon}`];
  }
}
