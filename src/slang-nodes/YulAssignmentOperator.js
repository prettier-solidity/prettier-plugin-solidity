import { SlangNode } from './SlangNode.js';
import { YulColonEqual } from './YulColonEqual.js';

export class YulAssignmentOperator extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      variant:
        ast.variant.type === 'Terminal'
          ? ast.variant.text
          : new YulColonEqual(
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
