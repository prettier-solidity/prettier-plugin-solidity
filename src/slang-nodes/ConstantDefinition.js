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

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { typeName, constantKeyword, name, equal, value, semicolon } = ast;
      this.typeName = new TypeName(
        typeName,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.constantKeyword = constantKeyword.text;
      this.name = name.text;
      this.equal = equal.text;
      this.value = new Expression(
        value,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
      this.semicolon = semicolon.text;
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  // TODO: implement print
  print(path, print, options) {
    return ['TODO: ConstantDefinition'];
  }
}
