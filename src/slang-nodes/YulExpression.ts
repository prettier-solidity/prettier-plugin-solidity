import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulFunctionCallExpression } from './YulFunctionCallExpression.js';
import { YulLiteral } from './YulLiteral.js';
import { YulBuiltInFunction } from './YulBuiltInFunction.js';
import { YulPath } from './YulPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class YulExpression implements SlangNode {
  readonly kind = NonterminalKind.YulExpression;

  comments;

  loc;

  variant:
    | YulFunctionCallExpression
    | YulLiteral
    | YulBuiltInFunction
    | YulPath;

  constructor(
    ast: ast.YulExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case NonterminalKind.YulFunctionCallExpression:
        this.variant = new YulFunctionCallExpression(
          ast.variant as ast.YulFunctionCallExpression,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.YulLiteral:
        this.variant = new YulLiteral(
          ast.variant as ast.YulLiteral,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.YulBuiltInFunction:
        this.variant = new YulBuiltInFunction(
          ast.variant as ast.YulBuiltInFunction,
          offsets[0]
        );
        break;
      case NonterminalKind.YulPath:
        this.variant = new YulPath(ast.variant as ast.YulPath, offsets[0]);
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<YulExpression>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return path.call(print, 'variant');
  }
}