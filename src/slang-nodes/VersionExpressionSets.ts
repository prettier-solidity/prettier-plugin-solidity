import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { VersionExpressionSet } from './VersionExpressionSet.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class VersionExpressionSets extends SlangNode {
  readonly kind = NonterminalKind.VersionExpressionSets;

  items: VersionExpressionSet[];

  separators: string[];

  constructor(ast: ast.VersionExpressionSets) {
    super(ast, true);

    this.items = ast.items.map((item) => new VersionExpressionSet(item));
    this.separators = ast.separators.map((separator) => separator.unparse());

    this.updateMetadata([this.items]);
  }

  print(path: AstPath<VersionExpressionSets>, print: PrintFunction): Doc {
    return path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [` ${this.separators[index - 1]} `, item]
      );
  }
}
