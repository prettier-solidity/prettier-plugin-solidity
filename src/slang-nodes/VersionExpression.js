import { SlangNode } from './SlangNode.js';
import { VersionRange } from './VersionRange.js';
import { VersionComparator } from './VersionComparator.js';
import { VersionSpecifiers } from './VersionSpecifiers.js';

const variants = {
  VersionRange,
  VersionComparator,
  VersionSpecifiers
};

export class VersionExpression extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      variant:
        ast.variant.type === 'Terminal'
          ? ast.variant.text
          : new variants[ast.variant.cst.kind](
              ast.variant,
              childrenOffsets.shift(),
              comments,
              options
            )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
