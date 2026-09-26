import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { join } from '../slang-printers/prettier-builders.ts';
import { SlangNode } from './SlangNode.ts';
import { YulPath } from './YulPath.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulPaths extends SlangNode {
  readonly kind = NonterminalKind.YulPaths;

  items: YulPath[];

  constructor(ast: ast.YulPaths, collected: CollectedMetadata) {
    super(ast, collected, true);

    this.items = ast.items.map((item) => new YulPath(item, collected));
  }

  print(print: PrintFunction, path: AstPath<YulPaths>): Doc {
    return join(', ', path.map(print, 'items'));
  }
}
