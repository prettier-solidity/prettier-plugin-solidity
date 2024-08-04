import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulStatements } from './YulStatements.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class YulBlock implements SlangNode {
  readonly kind = NonterminalKind.YulBlock;

  comments;

  loc;

  openBrace: string;

  statements: YulStatements;

  closeBrace: string;

  constructor(
    ast: ast.YulBlock,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.openBrace = ast.openBrace.text;
    this.statements = new YulStatements(ast.statements, offsets[0], options);
    this.closeBrace = ast.closeBrace.text;

    metadata = updateMetadata(metadata, [this.statements]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulBlock>, print: (path: AstPath<AstNode>) => Doc): Doc {
    return [this.openBrace, path.call(print, 'statements'), this.closeBrace];
  }
}