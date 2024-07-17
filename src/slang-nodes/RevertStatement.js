import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

export class RevertStatement extends SlangNode {
  revertKeyword;

  error;

  arguments;

  semicolon;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      revertKeyword: ast.revertKeyword.text,
      error: ast.error
        ? new IdentifierPath(
            ast.error,
            childrenOffsets.shift(),
            comments,
            options
          )
        : undefined,
      arguments: new ArgumentsDeclaration(
        ast.arguments,
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
      `${this.revertKeyword} `,
      this.error ? path.call(print, 'error') : '',
      path.call(print, 'arguments'),
      this.semicolon
    ];
  }
}
