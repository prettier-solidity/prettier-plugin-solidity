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

  constructor(
    ast: ast.StructDefinition,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = new Identifier(ast.name, offsets[0]);
    this.members = new StructMembers(ast.members, offsets[1], options);

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
