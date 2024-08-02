import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { EnumMembers } from './EnumMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class EnumDefinition implements SlangNode {
  readonly kind = NonterminalKind.EnumDefinition;

  comments;

  loc;

  enumKeyword: string;

  name: string;

  openBrace: string;

  members: EnumMembers;

  closeBrace: string;

  constructor(ast: ast.EnumDefinition, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.enumKeyword = ast.enumKeyword.text;
    this.name = ast.name.text;
    this.openBrace = ast.openBrace.text;
    this.members = new EnumMembers(ast.members, offsets[0]);
    this.closeBrace = ast.closeBrace.text;

    metadata = updateMetadata(metadata, [this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<EnumDefinition>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [
      `${this.enumKeyword} ${this.name} ${this.openBrace}`,
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
