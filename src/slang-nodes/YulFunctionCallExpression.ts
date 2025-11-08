import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulArguments } from './YulArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class YulFunctionCallExpression extends SlangNode {
  readonly kind = NonterminalKind.YulFunctionCallExpression;

  operand: YulExpression['variant'];

  arguments: YulArguments;

  constructor(
    ast: ast.YulFunctionCallExpression,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.operand = extractVariant(new YulExpression(ast.operand, options));
    this.arguments = new YulArguments(ast.arguments, options);

    this.updateMetadata(this.operand, this.arguments);
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
