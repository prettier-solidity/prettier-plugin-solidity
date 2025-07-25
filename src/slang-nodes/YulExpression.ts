import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulFunctionCallExpression } from './YulFunctionCallExpression.js';
import { YulLiteral } from './YulLiteral.js';
import { YulPath } from './YulPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.YulExpression['variant'],
  options: ParserOptions<AstNode>
): YulExpression['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.YulFunctionCallExpression:
      return new YulFunctionCallExpression(
        variant as ast.YulFunctionCallExpression,
        options
      );
    case NonterminalKind.YulLiteral:
      return new YulLiteral(variant as ast.YulLiteral, options);
    case NonterminalKind.YulPath:
      return new YulPath(variant as ast.YulPath);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

export class YulExpression extends SlangNode {
  readonly kind = NonterminalKind.YulExpression;

  variant: YulFunctionCallExpression | YulLiteral | YulPath;

  constructor(ast: ast.YulExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<YulExpression>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
