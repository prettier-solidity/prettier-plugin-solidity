import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

const variants = { ElementaryType, IdentifierPath };

export class MappingKeyType extends SlangNode {
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

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
