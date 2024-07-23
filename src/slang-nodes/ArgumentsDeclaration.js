import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';
import { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.js';
import { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.js';

const variants = { PositionalArgumentsDeclaration, NamedArgumentsDeclaration };

export class ArgumentsDeclaration extends SlangNode {
  get kind() {
    return NonterminalKind.ArgumentsDeclaration;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (offsets) => ({
      variant: new variants[ast.variant.cst.kind](
        ast.variant,
        offsets[0],
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
