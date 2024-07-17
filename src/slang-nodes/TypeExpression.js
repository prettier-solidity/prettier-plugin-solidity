import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class TypeExpression extends SlangNode {
  typeKeyword;

  openParen;

  typeName;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      typeKeyword: ast.typeKeyword.text,
      openParen: ast.openParen.text,
      typeName: new TypeName(
        ast.typeName,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: TypeExpression'];
  }
}
