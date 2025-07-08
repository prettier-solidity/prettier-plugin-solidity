import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { IdentifierPath } from './IdentifierPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class OverridePaths extends SlangNode {
  readonly kind = NonterminalKind.OverridePaths;

  items: IdentifierPath[];

  constructor(ast: ast.OverridePaths) {
    super(ast, true);

    this.items = ast.items.map((item) => new IdentifierPath(item));

    this.updateMetadata(this.items);
  }

  print(path: AstPath<OverridePaths>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
