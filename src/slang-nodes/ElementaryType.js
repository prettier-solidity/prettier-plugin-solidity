import { SlangNode } from './SlangNode.js';
import { AddressType } from './AddressType.js';

export class ElementaryType extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();
    const fetch = (childrenOffsets) => {
      const { variant } = ast;
      this.variant =
        variant.type === 'Terminal'
          ? variant.text
          : new AddressType(
              variant,
              childrenOffsets.shift(),
              comments,
              options
            );
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
