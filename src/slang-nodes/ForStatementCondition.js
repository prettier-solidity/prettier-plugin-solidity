import { SlangNode } from './SlangNode.js';
import { ExpressionStatement } from './ExpressionStatement.js';

export class ForStatementCondition extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { variant } = ast;
      this.variant =
        variant.type === 'Terminal'
          ? variant.text
          : new ExpressionStatement(
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
