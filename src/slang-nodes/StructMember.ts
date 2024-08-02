import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class StructMember implements SlangNode {
  readonly kind = NonterminalKind.StructMember;

  comments;

  loc;

  typeName: TypeName;

  name: string;

  semicolon: string;

  constructor(
    ast: ast.StructMember,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new TypeName(ast.typeName, offsets[0], options);
    this.name = ast.name.text;
    this.semicolon = ast.semicolon.text;

    metadata = updateMetadata(metadata, [this.typeName]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<StructMember>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [path.call(print, 'typeName'), ` ${this.name}${this.semicolon}`];
  }
}
