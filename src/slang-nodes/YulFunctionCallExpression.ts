import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulExpression } from './YulExpression.js';
import { YulArguments } from './YulArguments.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulFunctionCallExpression extends SlangNode {
  readonly kind = NonterminalKind.YulFunctionCallExpression;

  operand: YulExpression['variant'];

  arguments: YulArguments;

  constructor(
    ast: ast.YulFunctionCallExpression,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    this.operand = extractVariant(new YulExpression(ast.operand, collected));
    this.arguments = new YulArguments(ast.arguments, collected);

    this.updateMetadata(this.operand, this.arguments);
  }

  print(print: PrintFunction): Doc {
    return [print('operand'), '(', print('arguments'), ')'];
  }
}
