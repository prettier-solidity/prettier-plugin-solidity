import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { YulPath } from './YulPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class YulPaths extends SlangNode {
  readonly kind = NonterminalKind.YulPaths;

  items: YulPath[];

  constructor(ast: ast.YulPaths) {
    super(ast, true);

    this.items = ast.items.map((item) => new YulPath(item));
  }

  print(path: AstPath<YulPaths>, print: PrintFunction): Doc {
    return join(', ', path.map(print, 'items'));
  }
}
