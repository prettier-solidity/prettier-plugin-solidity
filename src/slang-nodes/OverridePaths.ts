import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';

export class OverridePaths implements SlangNode {
  readonly kind = NonterminalKind.OverridePaths;

  comments;

  loc;

  items: IdentifierPath[];

  separators: string[];

  constructor(ast: ast.OverridePaths, offset: number) {
    let metadata = getNodeMetadata(ast, offset, true);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new IdentifierPath(item, offsets[index])
    );
    this.separators = ast.separators.map((separator) => separator.text);

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<OverridePaths>, print: PrintFunction): Doc {
    return printSeparatedList(path.map(print, 'items'));
  }
}
