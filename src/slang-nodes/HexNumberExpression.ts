import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { NumberUnit } from './NumberUnit.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class HexNumberExpression implements SlangNode {
  readonly kind = NonterminalKind.HexNumberExpression;

  comments;

  loc;

  literal: string;

  unit?: NumberUnit;

  constructor(ast: ast.HexNumberExpression, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.literal = ast.literal.text;
    if (ast.unit) {
      this.unit = new NumberUnit(ast.unit, offsets[0]);
    }

    metadata = updateMetadata(metadata, [this.unit]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<HexNumberExpression>, print: PrintFunction): Doc {
    return joinExisting(' ', [this.literal, path.call(print, 'unit')]);
  }
}