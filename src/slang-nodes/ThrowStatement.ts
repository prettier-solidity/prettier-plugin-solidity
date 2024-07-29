import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/get-offsets.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.js';

export class ThrowStatement implements SlangNode {
  readonly kind = NonterminalKind.ThrowStatement;

  comments;

  loc;

  throwKeyword: string;

  semicolon: string;

  constructor(ast: ast.ThrowStatement, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.throwKeyword = ast.throwKeyword.text;
    this.semicolon = ast.semicolon.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return `${this.throwKeyword}${this.semicolon}`;
  }
}
