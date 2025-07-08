import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ImportAlias implements SlangNode {
  readonly kind = NonterminalKind.ImportAlias;

  comments;

  loc;

  identifier: Identifier;

  constructor(ast: ast.ImportAlias) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.identifier = new Identifier(ast.identifier);
  }

  print(path: AstPath<ImportAlias>, print: PrintFunction): Doc {
    return [' as ', path.call(print, 'identifier')];
  }
}
