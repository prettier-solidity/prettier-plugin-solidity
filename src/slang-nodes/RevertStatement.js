import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

export class RevertStatement extends SlangNode {
  get kind() {
    return NonterminalKind.RevertStatement;
  }

  revertKeyword;

  error;

  arguments;

  semicolon;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => {
      let i = -1;
      const children = {
        revertKeyword: ast.revertKeyword.text,
        error: ast.error
          ? new IdentifierPath(ast.error, offsets[(i += 1)], options)
          : undefined,
        arguments: new ArgumentsDeclaration(
          ast.arguments,
          offsets[(i += 1)],
          options
        ),
        semicolon: ast.semicolon.text
      };
      return children;
    };

    this.initialize(ast, offset, fetch);
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
