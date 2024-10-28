import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { EnumMembers } from './EnumMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class EnumDefinition implements SlangNode {
  readonly kind = NonterminalKind.EnumDefinition;

  comments;

  loc;

  name: Identifier;

  members: EnumMembers;

  constructor(ast: ast.EnumDefinition) {
    let metadata = getNodeMetadata(ast);

    this.name = new Identifier(ast.name);
    this.members = new EnumMembers(ast.members);

    metadata = updateMetadata(metadata, [this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<EnumDefinition>, print: PrintFunction): Doc {
    return [
      'enum ',
      path.call(print, 'name'),
      ' {',
      path.call(print, 'members'),
      '}'
    ];
  }
}
