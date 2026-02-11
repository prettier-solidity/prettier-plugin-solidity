import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulFunctionCallExpression } from './YulFunctionCallExpression.js';
import { YulLiteral } from './YulLiteral.js';
import { YulPath } from './YulPath.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const variantConstructors = {
  [ast.YulFunctionCallExpression.name]: YulFunctionCallExpression,
  [ast.YulPath.name]: YulPath
};

const variantWithVariantsConstructors = {
  [ast.YulLiteral.name]: YulLiteral
};

function createNonterminalVariant(
  variant: ast.YulExpression['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): YulExpression['variant'] {
  const variantConstructor = variantConstructors[variant.constructor.name];
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected, options);

  const variantWithVariantsConstructor =
    variantWithVariantsConstructors[variant.constructor.name];
  if (variantWithVariantsConstructor !== undefined)
    return extractVariant(
      new variantWithVariantsConstructor(variant as never, collected, options)
    );

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
}

export class YulExpression extends SlangNode {
  readonly kind = NonterminalKind.YulExpression;

  variant: YulFunctionCallExpression | YulLiteral['variant'] | YulPath;

  constructor(
    ast: ast.YulExpression,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
