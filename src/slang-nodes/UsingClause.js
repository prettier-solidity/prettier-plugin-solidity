import { SlangNode } from './SlangNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

const variants = { IdentifierPath, UsingDeconstruction };

export class UsingClause extends SlangNode {
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
