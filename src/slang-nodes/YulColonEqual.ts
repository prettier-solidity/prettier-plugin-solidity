import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { /*AstPath,*/ Doc /*, ParserOptions*/ } from 'prettier';
import type { SlangNode } from '../types';

export class YulColonEqual implements SlangNode {
  readonly kind = NonterminalKind.YulColonEqual;

  comments;

  loc;

  colon: string;

  equal: string;

  constructor(ast: ast.YulColonEqual, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.colon = ast.colon.text;
    this.equal = ast.equal.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  // TODO: implement print
  print(/*
    path: AstPath<YulColonEqual>,
    print: (path: AstPath<AstNode>) => Doc,
    options: ParserOptions<AstNode>
  */): Doc {
    return ['TODO: YulColonEqual'];
  }
}
