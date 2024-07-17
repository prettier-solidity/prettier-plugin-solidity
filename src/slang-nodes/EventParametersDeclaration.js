import { SlangNode } from './SlangNode.js';
import { EventParameters } from './EventParameters.js';

export class EventParametersDeclaration extends SlangNode {
  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openParen, parameters, closeParen } = ast;
      this.openParen = openParen.text;
      this.parameters = new EventParameters(
        parameters,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.closeParen = closeParen.text;
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
