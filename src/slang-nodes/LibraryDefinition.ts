const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { Identifier } from './Identifier.js';
import { LibraryMembers } from './LibraryMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { group, line } = doc.builders;

export class LibraryDefinition extends SlangNode {
  readonly kind = NonterminalKind.LibraryDefinition;

  name: Identifier;

  members: LibraryMembers;

  constructor(ast: ast.LibraryDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.name = new Identifier(ast.name);
    this.members = new LibraryMembers(ast.members, options);

    this.updateMetadata(this.members);
  }

  print(path: AstPath<LibraryDefinition>, print: PrintFunction): Doc {
    return [
      group(['library ', path.call(print, 'name'), line, '{']),
      path.call(print, 'members'),
      '}'
    ];
  }
}
