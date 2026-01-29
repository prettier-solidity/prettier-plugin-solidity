import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { joinExisting } from '../slang-utils/join-existing.js';
import { SlangNode } from './SlangNode.js';
import { NumberUnit } from './NumberUnit.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class DecimalNumberExpression extends SlangNode {
  readonly kind = NonterminalKind.DecimalNumberExpression;

  literal: string;

  unit?: NumberUnit;

  constructor(
    ast: ast.DecimalNumberExpression,
    options: ParserOptions<AstNode>
  ) {
    super(ast, options);

    this.literal = ast.literal.unparse();
    if (ast.unit) {
      this.unit = new NumberUnit(ast.unit, options);
    }

    this.updateMetadata(this.unit);
  }

  print(path: AstPath<DecimalNumberExpression>, print: PrintFunction): Doc {
    return joinExisting(' ', [this.literal, path.call(print, 'unit')]);
  }
}
