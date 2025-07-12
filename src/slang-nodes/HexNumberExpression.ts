import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { joinExisting } from '../slang-utils/join-existing.js';
import { SlangNode } from './SlangNode.js';
import { NumberUnit } from './NumberUnit.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class HexNumberExpression extends SlangNode {
  readonly kind = NonterminalKind.HexNumberExpression;

  literal: string;

  unit?: NumberUnit;

  constructor(ast: ast.HexNumberExpression) {
    super(ast);

    this.literal = ast.literal.unparse();
    if (ast.unit) {
      this.unit = new NumberUnit(ast.unit);
    }

    this.updateMetadata(this.unit);
  }

  print(path: AstPath<HexNumberExpression>, print: PrintFunction): Doc {
    return joinExisting(' ', [this.literal, path.call(print, 'unit')]);
  }
}
