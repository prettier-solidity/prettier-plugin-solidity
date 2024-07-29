import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { YulFunctionCallExpression } from './YulFunctionCallExpression.js';
import { YulLiteral } from './YulLiteral.js';
import { YulBuiltInFunction } from './YulBuiltInFunction.js';
import { YulPath } from './YulPath.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class YulExpression implements SlangNode {
  readonly kind = NonterminalKind.YulExpression;

  comments;

  loc;

  variant:
    | YulFunctionCallExpression
    | YulLiteral
    | YulBuiltInFunction
    | YulPath;

  constructor(ast: ast.YulExpression, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case 'YulFunctionCallExpression':
        this.variant = new YulFunctionCallExpression(
          ast.variant as ast.YulFunctionCallExpression,
          offsets[0],
          options
        );
        break;
      case 'YulLiteral':
        this.variant = new YulLiteral(
          ast.variant as ast.YulLiteral,
          offsets[0],
          options
        );
        break;
      case 'YulBuiltInFunction':
        this.variant = new YulBuiltInFunction(
          ast.variant as ast.YulBuiltInFunction,
          offsets[0]
        );
        break;
      case 'YulPath':
        this.variant = new YulPath(ast.variant as ast.YulPath, offsets[0]);
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return path.call(print, 'variant');
  }
}
