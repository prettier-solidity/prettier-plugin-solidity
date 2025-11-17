import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulFunctionCallExpression } from './YulFunctionCallExpression.js';
import { YulLiteral } from './YulLiteral.js';
import { YulPath } from './YulPath.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.YulExpression['variant'],
  options: ParserOptions<AstNode>
): YulExpression['variant'] {
  if (variant instanceof ast.YulFunctionCallExpression) {
    return new YulFunctionCallExpression(variant, options);
  }
  if (variant instanceof ast.YulLiteral) {
    return extractVariant(new YulLiteral(variant, options));
  }
  if (variant instanceof ast.YulPath) {
    return new YulPath(variant);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class YulExpression extends SlangNode {
  readonly kind = NonterminalKind.YulExpression;

  variant: YulFunctionCallExpression | YulLiteral['variant'] | YulPath;

  constructor(ast: ast.YulExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
