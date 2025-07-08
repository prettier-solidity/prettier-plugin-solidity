import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { IdentifierPath } from './IdentifierPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class OverridePaths implements SlangNode {
  readonly kind = NonterminalKind.OverridePaths;

  comments;

  loc;

  items: IdentifierPath[];

  constructor(ast: ast.OverridePaths) {
    const metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new IdentifierPath(item));

    [this.loc, this.comments] = updateMetadata(metadata, [this.items]);
  }

  print(path: AstPath<OverridePaths>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
