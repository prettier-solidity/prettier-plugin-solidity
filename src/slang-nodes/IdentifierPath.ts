import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { join } = doc.builders;

export class IdentifierPath implements SlangNode {
  readonly kind = NonterminalKind.IdentifierPath;

  comments;

  loc;

  items: Identifier[];

  constructor(ast: ast.IdentifierPath) {
    const metadata = getNodeMetadata(ast);

    this.items = ast.items.map((item) => new Identifier(item));

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<IdentifierPath>, print: PrintFunction): Doc {
    return join('.', path.map(print, 'items'));
  }
}
