import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class VariableDeclarationType extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      variant:
        ast.variant.type === 'Terminal'
          ? ast.variant.type
          : new TypeName(
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
