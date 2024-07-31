import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/get-offsets.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { /*AstPath,*/ Doc /*, ParserOptions*/ } from 'prettier';
import type { SlangNode } from '../types.js';

export class YulLeaveStatement implements SlangNode {
  readonly kind = NonterminalKind.YulLeaveStatement;

  comments;

  loc;

  leaveKeyword: string;

  constructor(ast: ast.YulLeaveStatement, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.leaveKeyword = ast.leaveKeyword.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  // TODO: implement print
  print(/*
    path: AstPath,
    print: (path: AstPath) => Doc,
    options: ParserOptions
  */): Doc {
    return ['TODO: YulLeaveStatement'];
  }
}
