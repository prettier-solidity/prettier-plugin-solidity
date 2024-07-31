import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { VersionExpression } from './VersionExpression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class VersionRange implements SlangNode {
  readonly kind = NonterminalKind.VersionRange;

  comments;

  loc;

  leftOperand: VersionExpression;

  operator: string;

  rightOperand: VersionExpression;

  constructor(ast: ast.VersionRange, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.leftOperand = new VersionExpression(ast.leftOperand, offsets[0]);
    this.operator = ast.operator.text;
    this.rightOperand = new VersionExpression(ast.rightOperand, offsets[1]);

    metadata = updateMetadata(metadata, [this.leftOperand, this.rightOperand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  // TODO: implement print
  print(
    path: AstPath,
    print: (path: AstPath) => Doc,
    options: ParserOptions
  ): Doc {
    return ['TODO: VersionRange'];
  }
}
