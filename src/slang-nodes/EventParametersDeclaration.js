import { SlangNode } from './SlangNode.js';
import { EventParameters } from './EventParameters.js';

export class EventParametersDeclaration extends SlangNode {
  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openParen: ast.openParen.text,
      parameters: new EventParameters(
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
