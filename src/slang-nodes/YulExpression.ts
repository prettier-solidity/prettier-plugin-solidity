import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { YulFunctionCallExpression } from './YulFunctionCallExpression.js';
import { YulLiteral } from './YulLiteral.js';
import { YulPath } from './YulPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class YulExpression extends PolymorphicNode {
  readonly kind = NonterminalKind.YulExpression;

  variant: YulFunctionCallExpression | YulLiteral | YulPath;

  constructor(ast: ast.YulExpression, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.YulFunctionCallExpression:
        this.variant = new YulFunctionCallExpression(
          variant as ast.YulFunctionCallExpression,
          options
        );
        break;
      case NonterminalKind.YulLiteral:
        this.variant = new YulLiteral(variant as ast.YulLiteral, options);
        break;
      case NonterminalKind.YulPath:
        this.variant = new YulPath(variant as ast.YulPath);
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }
}
