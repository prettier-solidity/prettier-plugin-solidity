import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { Expression } from './Expression.ts';
import { CallOptions } from './CallOptions.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class CallOptionsExpression extends SlangNode {
  readonly kind = NonterminalKind.CallOptionsExpression;

  operand: Expression['variant'];

  options: CallOptions;

  constructor(ast: ast.CallOptionsExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.operand = extractVariant(new Expression(ast.operand, collected));
    this.options = new CallOptions(ast.options, collected);

    this.updateMetadata(this.operand, this.options);
  }

  print(print: PrintFunction): Doc {
    return [print('operand'), '{', print('options'), '}'];
  }
}
