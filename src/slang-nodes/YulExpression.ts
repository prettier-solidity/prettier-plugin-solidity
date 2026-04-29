import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNonterminalNode } from './PolymorphicNonterminalNode.js';
import { YulFunctionCallExpression } from './YulFunctionCallExpression.js';
import { YulLiteral } from './YulLiteral.js';
import { YulPath } from './YulPath.js';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.YulExpression,
  YulExpression
>(
  [
    [ast.YulFunctionCallExpression, YulFunctionCallExpression],
    [ast.YulPath, YulPath]
  ],
  [[ast.YulLiteral, YulLiteral]]
);

export class YulExpression extends PolymorphicNonterminalNode<
  ast.YulExpression,
  YulFunctionCallExpression | YulLiteral['variant'] | YulPath
> {
  readonly kind = NonterminalKind.YulExpression;

  constructor(ast: ast.YulExpression, collected: CollectedMetadata) {
    super(ast, collected, createNonterminalVariant);
  }
}
