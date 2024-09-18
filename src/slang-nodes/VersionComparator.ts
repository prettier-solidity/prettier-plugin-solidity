import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionExpression } from './VersionExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class VersionComparator implements SlangNode {
  readonly kind = NonterminalKind.VersionComparator;

  comments;

  loc;

  operator: string;

  operand: VersionExpression;

  constructor(ast: ast.VersionComparator, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.operator = ast.operator.text;
    this.operand = new VersionExpression(ast.operand, offsets[0]);

    metadata = updateMetadata(metadata, [this.operand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<VersionComparator>, print: PrintFunction): Doc {
    return [this.operator, path.call(print, 'operand')];
  }
}
