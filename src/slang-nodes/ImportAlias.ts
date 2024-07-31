import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.js';

export class ImportAlias implements SlangNode {
  readonly kind = NonterminalKind.ImportAlias;

  comments;

  loc;

  asKeyword: string;

  identifier: string;

  constructor(ast: ast.ImportAlias, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.asKeyword = ast.asKeyword.text;
    this.identifier = ast.identifier.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return ` ${this.asKeyword} ${this.identifier}`;
  }
}
