import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { NodeCollection } from './NodeCollection.js';
import { IdentifierPath } from './IdentifierPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class OverridePaths extends NodeCollection<
  ast.OverridePaths,
  IdentifierPath
> {
  readonly kind = NonterminalKind.OverridePaths;

  constructor(ast: ast.OverridePaths, collected: CollectedMetadata) {
    super(ast, collected, IdentifierPath);
  }

  print(print: PrintFunction, path: AstPath<OverridePaths>): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
