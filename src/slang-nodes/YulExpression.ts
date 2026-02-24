import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { YulFunctionCallExpression } from './YulFunctionCallExpression.js';
import { YulLiteral } from './YulLiteral.js';
import { YulPath } from './YulPath.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  slangAst.YulExpression,
  YulExpression
>(
  [
    [slangAst.YulFunctionCallExpression, YulFunctionCallExpression],
    [slangAst.YulPath, YulPath]
  ],
  [[slangAst.YulLiteral, YulLiteral]]
);

export class YulExpression extends SlangNode {
  readonly kind = NonterminalKind.YulExpression;

  variant: YulFunctionCallExpression | YulLiteral['variant'] | YulPath;

  constructor(
    ast: slangAst.YulExpression,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of `YulExpression`
      // in the `createNonterminalVariant` function above.
      ((variant: slangAst.YulExpression['variant']): void => {
        if (variant instanceof slangAst.YulFunctionCallExpression) return;
        if (variant instanceof slangAst.YulLiteral) return;
        if (variant instanceof slangAst.YulPath) return;
        /* c8 ignore next 2 */
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const _exhaustiveCheck: never = variant;
      })(ast.variant);
    }
    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
