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

  separators: string[];

  constructor(ast: ast.OverridePaths) {
    let metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => new IdentifierPath(item));
    this.separators = ast.separators.map((separator) => separator.unparse());

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<OverridePaths>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
