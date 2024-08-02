import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { OverridePaths } from './OverridePaths.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { /*AstPath,*/ Doc /*, ParserOptions*/ } from 'prettier';
import type { SlangNode } from '../types';

export class OverridePathsDeclaration implements SlangNode {
  readonly kind = NonterminalKind.OverridePathsDeclaration;

  comments;

  loc;

  openParen: string;

  paths: OverridePaths;

  closeParen: string;

  constructor(ast: ast.OverridePathsDeclaration, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openParen = ast.openParen.text;
    this.paths = new OverridePaths(ast.paths, offsets[0]);
    this.closeParen = ast.closeParen.text;

    metadata = updateMetadata(metadata, [this.paths]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  // TODO: implement print
  print(/*
    path: AstPath<OverridePathsDeclaration>,
    print: (path: AstPath<AstNode>) => Doc,
    options: ParserOptions<AstNode>
  */): Doc {
    return ['TODO: OverridePathsDeclaration'];
  }
}
