import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulArguments } from './YulArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class YulFunctionCallExpression extends SlangNode {
  readonly kind = NonterminalKind.YulFunctionCallExpression;

  operand: YulExpression;

  arguments: YulArguments;

  constructor(
    ast: ast.YulFunctionCallExpression,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.operand = new YulExpression(ast.operand, options);
    this.arguments = new YulArguments(ast.arguments, options);

    this.updateMetadata(this.operand, this.arguments);
  }

  print(path: AstPath<YulFunctionCallExpression>, print: PrintFunction): Doc {
    return [
      printVariant('operand', path, print),
      '(',
      path.call(print, 'arguments'),
      ')'
    ];
  }
}
