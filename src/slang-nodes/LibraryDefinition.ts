import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { LibraryMembers } from './LibraryMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, line } = doc.builders;

export class LibraryDefinition implements SlangNode {
  readonly kind = NonterminalKind.LibraryDefinition;

  comments;

  loc;

  name: Identifier;

  members: LibraryMembers;

  constructor(ast: ast.LibraryDefinition, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.name = new Identifier(ast.name);
    this.members = new LibraryMembers(ast.members, options);

    metadata = updateMetadata(metadata, [this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<LibraryDefinition>, print: PrintFunction): Doc {
    return [
      group(['library ', path.call(print, 'name'), line, '{']),
      path.call(print, 'members'),
      '}'
    ];
  }
}
