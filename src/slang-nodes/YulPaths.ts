import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { NodeCollection } from './NodeCollection.js';
import { YulPath } from './YulPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class YulPaths extends NodeCollection<ast.YulPaths, YulPath> {
  readonly kind = NonterminalKind.YulPaths;

  constructor(ast: ast.YulPaths, collected: CollectedMetadata) {
    super(ast, collected, YulPath);
  }

  print(print: PrintFunction, path: AstPath<YulPaths>): Doc {
    return join(', ', path.map(print, 'items'));
  }
}
