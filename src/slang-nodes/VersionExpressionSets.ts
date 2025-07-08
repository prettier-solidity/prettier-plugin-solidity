import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionExpressionSet } from './VersionExpressionSet.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { join } = doc.builders;

export class VersionExpressionSets implements SlangNode {
  readonly kind = NonterminalKind.VersionExpressionSets;

  comments;

  loc;

  items: VersionExpressionSet[];

  constructor(ast: ast.VersionExpressionSets) {
    const metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new VersionExpressionSet(item));

    [this.loc, this.comments] = updateMetadata(metadata, [this.items]);
  }

  print(path: AstPath<VersionExpressionSets>, print: PrintFunction): Doc {
    return join(' || ', path.map(print, 'items'));
  }
}
