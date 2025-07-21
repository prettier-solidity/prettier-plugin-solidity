import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { join } = doc.builders;

export class IdentifierPath extends SlangNode {
  readonly kind = NonterminalKind.IdentifierPath;

  items: Identifier[];

  constructor(ast: ast.IdentifierPath) {
    super(ast);

    this.items = ast.items.map((item) => new Identifier(item));
  }

  print(path: AstPath<IdentifierPath>, print: PrintFunction): Doc {
    return join('.', path.map(print, 'items'));
  }
}
