import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { VersionExpressionSet } from './VersionExpressionSet.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class VersionExpressionSets extends SlangNode {
  readonly kind = NonterminalKind.VersionExpressionSets;

  items: VersionExpressionSet[];

  constructor(ast: ast.VersionExpressionSets) {
    super(ast, true);

    this.items = ast.items.map((item) => new VersionExpressionSet(item));
  }

  print(path: AstPath<VersionExpressionSets>, print: PrintFunction): Doc {
    return join(' || ', path.map(print, 'items'));
  }
}
