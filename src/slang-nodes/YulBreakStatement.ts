import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types';

export class YulBreakStatement implements SlangNode {
  readonly kind = NonterminalKind.YulBreakStatement;

  comments;

  loc;

  breakKeyword: string;

  constructor(ast: ast.YulBreakStatement, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.breakKeyword = ast.breakKeyword.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return this.breakKeyword;
  }
}