import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { NumberUnit } from './NumberUnit.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class DecimalNumberExpression extends SlangNode {
  readonly kind = NonterminalKind.DecimalNumberExpression;

  literal: string;

  unit?: NumberUnit;

  constructor(ast: ast.DecimalNumberExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.literal = ast.literal.unparse();
    if (ast.unit) {
      this.unit = new NumberUnit(ast.unit, collected);
    }

    this.updateMetadata(this.unit);
  }

  print(print: PrintFunction): Doc {
    const unitDoc = print('unit');
    return [this.literal, unitDoc ? [' ', unitDoc] : unitDoc];
  }
}
