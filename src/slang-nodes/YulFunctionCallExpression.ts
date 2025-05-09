import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulExpression } from './YulExpression.js';
import { YulArguments } from './YulArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulFunctionCallExpression implements SlangNode {
  readonly kind = NonterminalKind.YulFunctionCallExpression;

  comments;

  loc;

  operand: YulExpression;

  arguments: YulArguments;

  constructor(ast: ast.YulFunctionCallExpression) {
    let metadata = getNodeMetadata(ast);

    this.operand = new YulExpression(ast.operand);
    this.arguments = new YulArguments(ast.arguments);

    metadata = updateMetadata(metadata, [this.operand, this.arguments]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
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
