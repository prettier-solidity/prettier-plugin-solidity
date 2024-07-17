import { SlangNode } from './SlangNode.js';
import { YulParameters } from './YulParameters.js';

export class YulParametersDeclaration extends SlangNode {
  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { openParen, parameters, closeParen } = ast;
      this.openParen = openParen.text;
      this.parameters = new YulParameters(
        parameters,
        childrenOffsets.shift(),
        comments,
        parse,
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
