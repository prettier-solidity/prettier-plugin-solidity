import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { Parameters } from './Parameters.js';

export class ParametersDeclaration extends SlangNode {
  get kind() {
    return NonterminalKind.ParametersDeclaration;
  }

  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, options) {
    super();

    if (offset) {
      const fetch = (childrenOffsets) => ({
        openParen: ast.openParen.text,
        parameters: new Parameters(
          ast.parameters,
          childrenOffsets.shift(),
          options
        ),
        closeParen: ast.closeParen.text
      });

      this.initialize(ast, offset, fetch);
    } else {
      this.loc = ast.loc;
      this.openParen = ast.openParen;
      this.parameters = ast.parameters;
      this.closeParen = ast.closeParen;
    }
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
