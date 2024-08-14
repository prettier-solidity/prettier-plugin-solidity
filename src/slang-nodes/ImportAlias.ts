import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class ImportAlias implements SlangNode {
  readonly kind = NonterminalKind.ImportAlias;

  comments;

  loc;

  identifier: Identifier;

  constructor(ast: ast.ImportAlias, offset: number) {
    const metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.identifier = new Identifier(ast.identifier, offsets[0]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ImportAlias>, print: PrintFunction): Doc {
    return [' as ', path.call(print, 'identifier')];
  }
}
