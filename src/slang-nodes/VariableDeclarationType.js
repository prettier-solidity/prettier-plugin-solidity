import { SlangNode } from './SlangNode.js';
import { TypeName } from './TypeName.js';

export class VariableDeclarationType extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { variant } = ast;
      this.variant =
        variant.type === 'Terminal'
          ? variant.type
          : new TypeName(variant, childrenOffsets.shift(), comments, options);
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
