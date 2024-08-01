import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Statements } from './Statements.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class Block implements SlangNode {
  readonly kind = NonterminalKind.Block;

  comments;

  loc;

  openBrace: string;

  statements: Statements;

  closeBrace: string;

  constructor(ast: ast.Block, offset: number, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openBrace = ast.openBrace.text;
    this.statements = new Statements(ast.statements, offsets[0], options);
    this.closeBrace = ast.closeBrace.text;

    metadata = updateMetadata(metadata, [this.statements]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<Block>, print: (path: AstPath<AstNode>) => Doc): Doc {
    return [this.openBrace, path.call(print, 'statements'), this.closeBrace];
  }
}
