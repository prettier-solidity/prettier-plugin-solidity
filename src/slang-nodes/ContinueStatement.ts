import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.js';

export class ContinueStatement implements SlangNode {
  readonly kind = NonterminalKind.ContinueStatement;

  comments;

  loc;

  continueKeyword: string;

  semicolon: string;

  constructor(ast: ast.ContinueStatement, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.continueKeyword = ast.continueKeyword.text;
    this.semicolon = ast.semicolon.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return `${this.continueKeyword}${this.semicolon}`;
  }
}
