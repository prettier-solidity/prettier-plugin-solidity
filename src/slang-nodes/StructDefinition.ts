import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Identifier } from './Identifier.js';
import { StructMembers } from './StructMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class StructDefinition implements SlangNode {
  readonly kind = NonterminalKind.StructDefinition;

  comments;

  loc;

  name: Identifier;

  members: StructMembers;

  constructor(ast: ast.StructDefinition, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.name = new Identifier(ast.name);
    this.members = new StructMembers(ast.members, options);

    metadata = updateMetadata(metadata, [this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<StructDefinition>, print: PrintFunction): Doc {
    return [
      'struct ',
      path.call(print, 'name'),
      ' {',
      path.call(print, 'members'),
      '}'
    ];
  }
}
