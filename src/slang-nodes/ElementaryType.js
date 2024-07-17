import { SlangNode } from './SlangNode.js';
import { AddressType } from './AddressType.js';

export class ElementaryType extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();
    const fetch = (childrenOffsets) => ({
      variant:
        ast.variant.type === 'Terminal'
          ? ast.variant.text
          : new AddressType(
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
