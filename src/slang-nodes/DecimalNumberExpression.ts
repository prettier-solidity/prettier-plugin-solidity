import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { NumberUnit } from './NumberUnit.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class DecimalNumberExpression implements SlangNode {
  readonly kind = NonterminalKind.DecimalNumberExpression;

  comments;

  loc;

  literal: string;

  unit?: NumberUnit;

  constructor(ast: ast.DecimalNumberExpression) {
    const metadata = getNodeMetadata(ast);

    this.literal = ast.literal.unparse();
    if (ast.unit) {
      this.unit = new NumberUnit(ast.unit);
    }

    [this.loc, this.comments] = updateMetadata(metadata, [this.unit]);
  }

  print(path: AstPath<DecimalNumberExpression>, print: PrintFunction): Doc {
    return joinExisting(' ', [this.literal, path.call(print, 'unit')]);
  }
}
