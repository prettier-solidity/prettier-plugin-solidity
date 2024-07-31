import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.js';

export class BreakStatement implements SlangNode {
  readonly kind = NonterminalKind.BreakStatement;

  comments;

  loc;

  breakKeyword: string;

  semicolon: string;

  constructor(ast: ast.BreakStatement, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.breakKeyword = ast.breakKeyword.text;
    this.semicolon = ast.semicolon.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return `${this.breakKeyword}${this.semicolon}`;
  }
}
