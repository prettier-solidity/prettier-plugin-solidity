import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulExpression } from './YulExpression.js';
import { YulArguments } from './YulArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulFunctionCallExpression implements SlangNode {
  readonly kind = NonterminalKind.YulFunctionCallExpression;

  comments;

  loc;

  operand: YulExpression;

  arguments: YulArguments;

  constructor(
    ast: ast.YulFunctionCallExpression,
    options: ParserOptions<AstNode>
  ) {
    const metadata = getNodeMetadata(ast);

    this.operand = new YulExpression(ast.operand, options);
    this.arguments = new YulArguments(ast.arguments, options);

    [this.loc, this.comments] = updateMetadata(metadata, [
      this.operand,
      this.arguments
    ]);
  }

  print(path: AstPath<YulFunctionCallExpression>, print: PrintFunction): Doc {
    return [
      path.call(print, 'operand'),
      '(',
      path.call(print, 'arguments'),
      ')'
    ];
  }
}
