import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class IdentifierPath implements SlangNode {
  readonly kind = NonterminalKind.IdentifierPath;

  comments;

  loc;

  items: Identifier[];

  separators: string[];

  constructor(ast: ast.IdentifierPath) {
    const metadata = getNodeMetadata(ast);

    this.items = ast.items.map((item) => new Identifier(item));
    this.separators = ast.separators.map((separator) => separator.unparse());

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<IdentifierPath>, print: PrintFunction): Doc {
    return path
      .map(print, 'items')
      .map((item, index) =>
        index === 0 ? item : [this.separators[index - 1], item]
      );
  }
}
