import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { UsingOperator } from './UsingOperator.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class UsingAlias implements SlangNode {
  readonly kind = NonterminalKind.UsingAlias;

  comments;

  loc;

  asKeyword: string;

  operator: UsingOperator;

  constructor(ast: ast.UsingAlias, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.asKeyword = ast.asKeyword.text;
    this.operator = new UsingOperator(ast.operator, offsets[0]);

    metadata = updateMetadata(metadata, [this.operator]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<UsingAlias>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [` ${this.asKeyword} `, path.call(print, 'operator')];
  }
}
