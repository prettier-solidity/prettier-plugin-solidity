import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

export class RevertStatement extends SlangNode {
  revertKeyword;

  error;

  arguments;

  semicolon;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { revertKeyword, error, semicolon } = ast;
      this.revertKeyword = revertKeyword.text;
      if (error) {
        this.error = new IdentifierPath(
          error,
          childrenOffsets.shift(),
          comments,
          parse,
          options
        );
      }
      this.arguments = new ArgumentsDeclaration(
        ast.arguments,
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
      `${this.revertKeyword} `,
      this.error ? path.call(print, 'error') : '',
      path.call(print, 'arguments'),
      this.semicolon
    ];
  }
}
