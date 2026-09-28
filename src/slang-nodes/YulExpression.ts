import { NonterminalKind, SlangAst } from '../slang-utils/slang.ts';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { YulFunctionCallExpression } from './YulFunctionCallExpression.ts';
import { YulLiteral } from './YulLiteral.ts';
import { YulPath } from './YulPath.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.YulExpression,
  YulExpression
>(
  () => [
    [SlangAst.YulFunctionCallExpression, YulFunctionCallExpression],
    [SlangAst.YulPath, YulPath]
  ],
  () => [[SlangAst.YulLiteral, YulLiteral]]
);

export class YulExpression extends SlangNode {
  readonly kind = NonterminalKind.YulExpression;

  variant: YulFunctionCallExpression | YulLiteral['variant'] | YulPath;

  constructor(ast: ast.YulExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
