import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class TypeExpression extends SlangNode {
  typeKeyword;

  openParen;

  typeName;

  closeParen;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { typeKeyword, openParen, typeName, closeParen } = ast;
      this.typeKeyword = typeKeyword.text;
      this.openParen = openParen.text;
      this.typeName = new TypeName(
        typeName,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.closeParen = closeParen.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: TypeExpression'];
  }
}
