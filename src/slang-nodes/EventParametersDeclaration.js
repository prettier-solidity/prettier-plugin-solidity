import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { EventParameters } from './EventParameters.js';

export class EventParametersDeclaration extends SlangNode {
  get kind() {
    return NonterminalKind.EventParametersDeclaration;
  }

  openParen;

  parameters;

  closeParen;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      openParen: ast.openParen.text,
      parameters: new EventParameters(ast.parameters, offsets[0], options),
      closeParen: ast.closeParen.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [this.openParen, path.call(print, 'parameters'), this.closeParen];
  }
}
