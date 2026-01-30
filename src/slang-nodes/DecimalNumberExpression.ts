import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { joinExisting } from '../slang-utils/join-existing.js';
import { SlangNode } from './SlangNode.js';
import { NumberUnit } from './NumberUnit.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
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

  print(path: AstPath<DecimalNumberExpression>, print: PrintFunction): Doc {
    return joinExisting(' ', [this.literal, path.call(print, 'unit')]);
  }
}
