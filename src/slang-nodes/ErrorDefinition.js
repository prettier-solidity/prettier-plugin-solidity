import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { ErrorParametersDeclaration } from './ErrorParametersDeclaration.js';

export class ErrorDefinition extends SlangNode {
  get kind() {
    return NonterminalKind.ErrorDefinition;
  }

  errorKeyword;

  name;

  members;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      errorKeyword: ast.errorKeyword.text,
      name: ast.name.text,
      members: new ErrorParametersDeclaration(
        ast.members,
        childrenOffsets.shift(),
        options
      ),
      semicolon: ast.semicolon.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.errorKeyword} ${this.name}`,
      path.call(print, 'members'),
      this.semicolon
    ];
  }
}
