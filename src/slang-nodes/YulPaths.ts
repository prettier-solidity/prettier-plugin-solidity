import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulPath } from './YulPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { join } = doc.builders;

export class YulPaths implements SlangNode {
  readonly kind = NonterminalKind.YulPaths;

  comments;

  loc;

  items: YulPath[];

  constructor(ast: ast.YulPaths) {
    [this.loc, this.comments] = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new YulPath(item));

    updateMetadata(this.loc, this.comments, [this.items]);
  }

  print(path: AstPath<YulPaths>, print: PrintFunction): Doc {
    return join(', ', path.map(print, 'items'));
  }
}
