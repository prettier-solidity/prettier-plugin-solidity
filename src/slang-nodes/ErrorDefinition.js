import { SlangNode } from './SlangNode.js';
import { ErrorParametersDeclaration } from './ErrorParametersDeclaration.js';

export class ErrorDefinition extends SlangNode {
  errorKeyword;

  name;

  members;

  semicolon;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { errorKeyword, name, members, semicolon } = ast;
      this.errorKeyword = errorKeyword.text;
      this.name = name.text;
      this.members = new ErrorParametersDeclaration(
        members,
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
      `${this.errorKeyword} ${this.name}`,
      path.call(print, 'members'),
      this.semicolon
    ];
  }
}
