import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { YulPath } from './YulPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class YulPaths extends SlangNode {
  readonly kind = NonterminalKind.YulPaths;

  items: YulPath[];

  separators: string[];

  constructor(ast: ast.YulPaths) {
    super(ast, true);

    this.items = ast.items.map((item) => new YulPath(item));
    this.separators = ast.separators.map((separator) => separator.unparse());

    this.updateMetadata(this.items);
  }

  print(path: AstPath<YulPaths>, print: PrintFunction): Doc {
    return path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [this.separators[index - 1], item]
      );
  }
}
