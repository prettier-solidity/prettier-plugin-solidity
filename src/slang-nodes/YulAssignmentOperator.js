import { SlangNode } from './SlangNode.js';
import { YulColonEqual } from './YulColonEqual.js';

export class YulAssignmentOperator extends SlangNode {
  variant;

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { variant } = ast;
      this.variant =
        variant.type === 'Terminal'
          ? variant.text
          : new YulColonEqual(
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
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
