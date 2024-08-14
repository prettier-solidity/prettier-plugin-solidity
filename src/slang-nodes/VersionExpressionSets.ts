import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionExpressionSet } from './VersionExpressionSet.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class VersionExpressionSets implements SlangNode {
  readonly kind = NonterminalKind.VersionExpressionSets;

  comments;

  loc;

  items: VersionExpressionSet[];

  separators: string[];

  constructor(ast: ast.VersionExpressionSets, offset: number) {
    let metadata = getNodeMetadata(ast, offset, true);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new VersionExpressionSet(item, offsets[index])
    );
    this.separators = ast.separators.map((separator) => separator.text);

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<VersionExpressionSets>, print: PrintFunction): Doc {
    return path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [` ${this.separators[index - 1]} `, item]
      );
  }
}
