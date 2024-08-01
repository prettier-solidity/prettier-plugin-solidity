import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { IdentifierPath } from './IdentifierPath.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { /*AstPath,*/ Doc /*, ParserOptions*/ } from 'prettier';
import type { SlangNode } from '../types.js';

export class OverridePaths implements SlangNode {
  readonly kind = NonterminalKind.OverridePaths;

  comments;

  loc;

  items: IdentifierPath[];

  separators: string[];

  constructor(ast: ast.OverridePaths, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.items = ast.items.map(
      (item, index) => new IdentifierPath(item, offsets[index])
    );
    this.separators = ast.separators.map((separator) => separator.text);

    metadata = updateMetadata(metadata, [this.items]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  // TODO: implement print
  print(/*
    path: AstPath<OverridePaths>,
    print: (path: AstPath<AstNode>) => Doc,
    options: ParserOptions<AstNode>
  */): Doc {
    return ['TODO: OverridePaths'];
  }
}
