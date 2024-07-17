import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class NewExpression extends SlangNode {
  newKeyword;

  typeName;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { newKeyword, typeName } = ast;
      this.newKeyword = newKeyword.text;
      this.typeName = new TypeName(
        typeName,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return [`${this.newKeyword} `, path.call(print, 'typeName')];
  }
}
