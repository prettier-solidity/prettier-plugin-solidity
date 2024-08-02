import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { LibraryMembers } from './LibraryMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

const { group, line } = doc.builders;

export class LibraryDefinition implements SlangNode {
  readonly kind = NonterminalKind.LibraryDefinition;

  comments;

  loc;

  libraryKeyword: string;

  name: string;

  openBrace: string;

  members: LibraryMembers;

  closeBrace: string;

  constructor(
    ast: ast.LibraryDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.libraryKeyword = ast.libraryKeyword.text;
    this.name = ast.name.text;
    this.openBrace = ast.openBrace.text;
    this.members = new LibraryMembers(ast.members, offsets[0], options);
    this.closeBrace = ast.closeBrace.text;

    metadata = updateMetadata(metadata, [this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<LibraryDefinition>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [
      group([`${this.libraryKeyword} ${this.name}`, line, this.openBrace]),
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
