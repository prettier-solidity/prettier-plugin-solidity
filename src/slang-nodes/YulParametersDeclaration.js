import { SlangNode } from './SlangNode.js';
import { YulParameters } from './YulParameters.js';

export class YulParametersDeclaration extends SlangNode {
  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      openParen: ast.openParen.text,
      parameters: new YulParameters(
        ast.parameters,
        childrenOffsets.shift(),
        options
      ),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
