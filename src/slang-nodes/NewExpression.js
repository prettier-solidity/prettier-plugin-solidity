import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class NewExpression extends SlangNode {
  newKeyword;

  typeName;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      newKeyword: ast.newKeyword.text,
      typeName: new TypeName(
        ast.typeName,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [`${this.newKeyword} `, path.call(print, 'typeName')];
  }
}
