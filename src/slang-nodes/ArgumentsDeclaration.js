import { SlangNode } from './SlangNode.js';
import { PositionalArgumentsDeclaration } from './PositionalArgumentsDeclaration.js';
import { NamedArgumentsDeclaration } from './NamedArgumentsDeclaration.js';

const variants = { PositionalArgumentsDeclaration, NamedArgumentsDeclaration };

export class ArgumentsDeclaration extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { variant } = ast;
      this.variant = new variants[variant.cst.kind](
        variant,
        childrenOffsets.shift(),
        comments,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
