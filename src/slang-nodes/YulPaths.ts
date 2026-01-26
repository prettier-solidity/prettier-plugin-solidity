import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { YulPath } from './YulPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.ts';

const { join } = doc.builders;

export class YulPaths extends SlangNode {
  readonly kind = NonterminalKind.YulPaths;

  items: YulPath[];

  constructor(ast: ast.YulPaths, options: ParserOptions<AstNode>) {
    super(ast, options, true);

    this.items = ast.items.map((item) => new YulPath(item, options));
  }

  print(path: AstPath<YulPaths>, print: PrintFunction): Doc {
    return join(', ', path.map(print, 'items'));
  }
}
