import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class SimpleVersionLiteral extends SlangNode {
  readonly kind = NonterminalKind.SimpleVersionLiteral;

  items: string[];

  separators: string[];

  constructor(ast: ast.SimpleVersionLiteral) {
    super(ast, true);

    this.items = ast.items.map((item) => item.unparse());
    this.separators = ast.separators.map((separator) => separator.unparse());
  }

  print(): Doc {
    return this.items.map((item, index) =>
      index === 0 ? item : [this.separators[index - 1], item]
    );
  }
}
