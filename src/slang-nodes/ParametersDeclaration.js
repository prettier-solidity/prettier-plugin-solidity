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

    const fetch =
      typeof offset !== 'undefined'
        ? (childrenOffsets) => ({
            openParen: ast.openParen.text,
            parameters: new Parameters(
              ast.parameters,
              childrenOffsets.shift(),
              options
            ),
            closeParen: ast.closeParen.text
          })
        : undefined;

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
