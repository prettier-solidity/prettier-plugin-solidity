import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.d.ts';

export class SimpleVersionLiteral implements SlangNode {
  readonly kind = NonterminalKind.SimpleVersionLiteral;

  comments;

  loc;

  items: string[];

  separators: string[];

  constructor(ast: ast.SimpleVersionLiteral) {
    const metadata = getNodeMetadata(ast, true);

    this.items = ast.items.map((item) => item.unparse());
    this.separators = ast.separators.map((separator) => separator.unparse());

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return this.items.map((item, index) =>
      index === 0 ? item : [this.separators[index - 1], item]
    );
  }
}
