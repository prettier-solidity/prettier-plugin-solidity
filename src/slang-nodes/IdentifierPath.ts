import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types';

export class IdentifierPath implements SlangNode {
  readonly kind = NonterminalKind.IdentifierPath;

  comments;

  loc;

  items: string[];

  separators: string[];

  constructor(ast: ast.IdentifierPath, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

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
