import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class TupleValue extends SlangNode {
  readonly kind = NonterminalKind.TupleValue;

  expression?: Expression['variant'];

  constructor(ast: ast.TupleValue, collected: CollectedMetadata) {
    super(ast, collected);

    if (ast.expression) {
      this.expression = extractVariant(
        new Expression(ast.expression, collected)
      );
    }

    this.updateMetadata(this.expression);
  }

  print(print: PrintFunction): Doc {
    return print('expression');
  }
}
