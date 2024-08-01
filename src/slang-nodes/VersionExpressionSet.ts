import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionExpression } from './VersionExpression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

const { join } = doc.builders;

export class VersionExpressionSet implements SlangNode {
  readonly kind = NonterminalKind.VersionExpressionSet;

  comments;

  loc;

  items: VersionExpression[];

  constructor(ast: ast.VersionExpressionSet, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new VersionExpression(item, offsets[index])
    );

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<VersionExpressionSet>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return join(' ', path.map(print, 'items'));
  }
}
