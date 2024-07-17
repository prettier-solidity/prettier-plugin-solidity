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

  constructor(ast, offset, comments, parse, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { variant } = ast;
      this.variant = new variants[variant.cst.kind](
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
    return path.call(print, 'variant');
  }
}
