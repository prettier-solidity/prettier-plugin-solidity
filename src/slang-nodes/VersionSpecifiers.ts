import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types';

export class VersionSpecifiers implements SlangNode {
  readonly kind = NonterminalKind.VersionSpecifiers;

  comments;

  loc;

  items: string[];

  separators: string[];

  constructor(ast: ast.VersionSpecifiers, offset: number) {
    const metadata = getNodeMetadata(ast, offset, true);

    this.items = ast.items.map((item) => item.text);
    this.separators = ast.separators.map((separator) => separator.text);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return this.items.map((item, index) =>
      index === 0 ? item : [this.separators[index - 1], item]
    );
  }
}
