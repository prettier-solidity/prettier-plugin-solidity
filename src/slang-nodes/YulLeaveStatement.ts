import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

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
    path: AstPath<YulLeaveStatement>,
    print: (path: AstPath<AstNode>) => Doc,
    options: ParserOptions<AstNode>
  */): Doc {
    return ['TODO: YulLeaveStatement'];
  }
}
