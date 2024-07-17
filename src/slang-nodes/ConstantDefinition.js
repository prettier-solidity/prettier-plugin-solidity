import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';
import { Expression } from './Expression.js';

export class ConstantDefinition extends SlangNode {
  typeName;

  constantKeyword;

  name;

  equal;

  value;

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
      constantKeyword: ast.constantKeyword.text,
      name: ast.name.text,
      equal: ast.equal.text,
      value: new Expression(
        ast.value,
        childrenOffsets.shift(),
        comments,
        options
      ),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: ConstantDefinition'];
  }
}
