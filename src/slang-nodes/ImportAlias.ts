import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class ImportAlias extends SlangNode {
  readonly kind = NonterminalKind.ImportAlias;

  identifier: Identifier;

  constructor(ast: ast.ImportAlias) {
    super(ast);

    this.identifier = new Identifier(ast.identifier);
  }

  print(path: AstPath<ImportAlias>, print: PrintFunction): Doc {
    return [' as ', path.call(print, 'identifier')];
  }
}
