import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { VersionExpressionSet } from './VersionExpressionSet.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class VersionExpressionSets extends SlangNode {
  readonly kind = NonterminalKind.VersionExpressionSets;

  items: VersionExpressionSet[];

  constructor(ast: ast.VersionExpressionSets, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map(
      (item) => new VersionExpressionSet(item, collected)
    );
  }

  print(path: AstPath<VersionExpressionSets>, print: PrintFunction): Doc {
    return join(' || ', path.map(print, 'items'));
  }
}
