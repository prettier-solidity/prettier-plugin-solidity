import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulFunctionCallExpression } from './YulFunctionCallExpression.js';
import { YulLiteral } from './YulLiteral.js';
import { YulPath } from './YulPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulExpression implements SlangNode {
  readonly kind = NonterminalKind.YulExpression;

  comments;

  loc;

  variant: YulFunctionCallExpression | YulLiteral | YulPath;

  constructor(ast: ast.YulExpression, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.YulFunctionCallExpression:
        this.variant = new YulFunctionCallExpression(
          ast.variant as ast.YulFunctionCallExpression,
          options
        );
        break;
      case NonterminalKind.YulLiteral:
        this.variant = new YulLiteral(ast.variant as ast.YulLiteral, options);
        break;
      case NonterminalKind.YulPath:
        this.variant = new YulPath(ast.variant as ast.YulPath);
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulExpression>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
