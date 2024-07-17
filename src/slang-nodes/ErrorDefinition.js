import { SlangNode } from './SlangNode.js';
import { ErrorParametersDeclaration } from './ErrorParametersDeclaration.js';

export class ErrorDefinition extends SlangNode {
  errorKeyword;

  name;

  members;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      errorKeyword: ast.errorKeyword.text,
      name: ast.name.text,
      members: new ErrorParametersDeclaration(
        ast.members,
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
      `${this.errorKeyword} ${this.name}`,
      path.call(print, 'members'),
      this.semicolon
    ];
  }
}
