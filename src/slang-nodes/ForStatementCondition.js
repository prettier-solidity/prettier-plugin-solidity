import { SlangNode } from './SlangNode.js';
import { ExpressionStatement } from './ExpressionStatement.js';

export class ForStatementCondition extends SlangNode {
  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      variant:
        ast.variant.type === 'Terminal'
          ? ast.variant.text
          : new ExpressionStatement(
              ast.variant,
              childrenOffsets.shift(),
              options
            )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
