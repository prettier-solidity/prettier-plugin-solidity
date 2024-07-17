import { SlangNode } from './SlangNode.js';
import { ElementaryType } from './ElementaryType.js';
import { IdentifierPath } from './IdentifierPath.js';

const variants = { ElementaryType, IdentifierPath };

export class MappingKeyType extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse, options) {
    super();
    const fetch = (childrenOffsets) => {
      const { variant } = ast;
      this.variant = new variants[variant.cst.kind](
        variant,
        childrenOffsets.shift(),
        comments,
        parse,
        options
      );
    };

    this.initialize(ast, offset, comments, fetch, parse);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
