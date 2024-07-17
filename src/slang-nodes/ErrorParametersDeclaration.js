import { SlangNode } from './SlangNode.js';
import { ErrorParameters } from './ErrorParameters.js';

export class ErrorParametersDeclaration extends SlangNode {
  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openParen, parameters, closeParen } = ast;
      this.openParen = openParen.text;
      this.parameters = new ErrorParameters(
        parameters,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.closeParen = closeParen.text;
    };

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
