import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class PostfixExpression extends SlangNode {
  readonly kind = NonterminalKind.PostfixExpression;

  operand: Expression['variant'];

  operator: string;

  constructor(
    ast: ast.PostfixExpression,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.operand = extractVariant(
      new Expression(ast.operand, collected, options)
    );
    this.operator = ast.operator.unparse();

    this.updateMetadata(this.operand);
  }

  print(print: PrintFunction): Doc {
    return [print('operand'), this.operator];
  }
}
