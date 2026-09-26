import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { Expression } from './Expression.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class ExpressionStatement extends SlangNode {
  readonly kind = NonterminalKind.ExpressionStatement;

  expression: Expression['variant'];

  constructor(ast: ast.ExpressionStatement, collected: CollectedMetadata) {
    super(ast, collected);

    this.expression = extractVariant(new Expression(ast.expression, collected));

    this.updateMetadata(this.expression);
  }

  print(print: PrintFunction): Doc {
    return [print('expression'), ';'];
  }
}
