import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionExpressionSet } from './VersionExpressionSet.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class VersionExpressionSets implements SlangNode {
  readonly kind = NonterminalKind.VersionExpressionSets;

  comments;

  loc;

  items: VersionExpressionSet[];

  separators: string[];

  constructor(ast: ast.VersionExpressionSets) {
    [this.loc, this.comments] = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new VersionExpressionSet(item));
    this.separators = ast.separators.map((separator) => separator.unparse());

    updateMetadata(this.loc, this.comments, [this.items]);
  }

  print(path: AstPath<VersionExpressionSets>, print: PrintFunction): Doc {
    return path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [` ${this.separators[index - 1]} `, item]
      );
  }
}
