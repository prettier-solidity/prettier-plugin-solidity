import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulPath } from './YulPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class YulPaths implements SlangNode {
  readonly kind = NonterminalKind.YulPaths;

  comments;

  loc;

  items: YulPath[];

  separators: string[];

  constructor(ast: ast.YulPaths, offset: number) {
    let metadata = getNodeMetadata(ast, offset, true);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new YulPath(item, offsets[index])
    );
    this.separators = ast.separators.map((separator) => separator.text);

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulPaths>, print: PrintFunction): Doc {
    return path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [this.separators[index - 1], item]
      );
  }
}