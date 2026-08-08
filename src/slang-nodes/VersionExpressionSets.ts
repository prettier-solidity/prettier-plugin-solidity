import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { NodeCollection } from './NodeCollection.js';
import { VersionExpressionSet } from './VersionExpressionSet.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class VersionExpressionSets extends NodeCollection<
  ast.VersionExpressionSets,
  VersionExpressionSet
> {
  readonly kind = NonterminalKind.VersionExpressionSets;

  constructor(ast: ast.VersionExpressionSets, collected: CollectedMetadata) {
    super(ast, collected, VersionExpressionSet);
  }

  print(print: PrintFunction, path: AstPath<VersionExpressionSets>): Doc {
    return join(' || ', path.map(print, 'items'));
  }
}
