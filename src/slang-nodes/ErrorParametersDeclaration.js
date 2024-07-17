import { SlangNode } from './SlangNode.js';
import { ErrorParameters } from './ErrorParameters.js';

export class ErrorParametersDeclaration extends SlangNode {
  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openParen: ast.openParen.text,
      parameters: new ErrorParameters(
        ast.parameters,
        childrenOffsets.shift(),
        comments,
        options
      ),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
