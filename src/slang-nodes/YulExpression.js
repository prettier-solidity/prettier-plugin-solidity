import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
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
  get kind() {
    return NonterminalKind.YulExpression;
  }

  variant;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      variant: new variants[ast.variant.cst.kind](
        ast.variant,
        childrenOffsets.shift(),
        options
      )
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return path.call(print, 'variant');
  }
}
