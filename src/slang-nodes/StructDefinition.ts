import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { StructMembers } from './StructMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class StructDefinition implements SlangNode {
  readonly kind = NonterminalKind.StructDefinition;

  comments;

  loc;

  structKeyword: string;

  name: string;

  openBrace: string;

  members: StructMembers;

  closeBrace: string;

  constructor(
    ast: ast.StructDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.structKeyword = ast.structKeyword.text;
    this.name = ast.name.text;
    this.openBrace = ast.openBrace.text;
    this.members = new StructMembers(ast.members, offsets[0], options);
    this.closeBrace = ast.closeBrace.text;

    metadata = updateMetadata(metadata, [this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<StructDefinition>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [
      `${this.structKeyword} ${this.name} ${this.openBrace}`,
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
