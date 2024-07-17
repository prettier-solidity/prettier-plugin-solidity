import { SlangNode } from './SlangNode.js';
import { ModifierInvocation } from './ModifierInvocation.js';

export class UnnamedFunctionAttribute extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { variant } = ast;
      this.variant =
        variant.type === 'Terminal'
          ? variant.text
          : new ModifierInvocation(
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
