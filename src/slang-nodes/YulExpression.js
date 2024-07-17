import { SlangNode } from './SlangNode.js';
import { YulFunctionCallExpression } from './YulFunctionCallExpression.js';
import { YulLiteral } from './YulLiteral.js';
import { YulBuiltInFunction } from './YulBuiltInFunction.js';
import { YulPath } from './YulPath.js';

const variants = {
  YulFunctionCallExpression,
  YulLiteral,
  YulBuiltInFunction,
  YulPath
};

export class YulExpression extends SlangNode {
  variant;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => ({
      variant: new variants[ast.variant.cst.kind](
        ast.variant,
        childrenOffsets.shift(),
        comments,
        options
      )
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
