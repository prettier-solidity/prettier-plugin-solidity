import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { SlangNode } from './SlangNode.js';
import { TerminalNode } from './TerminalNode.js';
import { LibraryMembers } from './LibraryMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { group, line } = doc.builders;

export class LibraryDefinition extends SlangNode {
  readonly kind = NonterminalKind.LibraryDefinition;

  name: TerminalNode;

  members: LibraryMembers;

  constructor(ast: ast.LibraryDefinition, options: ParserOptions<AstNode>) {
    super(ast);

    this.name = new TerminalNode(ast.name);
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
