import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { EnumMembers } from './EnumMembers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class EnumDefinition implements SlangNode {
  readonly kind = NonterminalKind.EnumDefinition;

  comments;

  loc;

  name: string;

  members: EnumMembers;

  constructor(ast: ast.EnumDefinition, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = ast.name.text;
    this.members = new EnumMembers(ast.members, offsets[0]);

    metadata = updateMetadata(metadata, [this.members]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<EnumDefinition>, print: PrintFunction): Doc {
    return [`enum ${this.name} {`, path.call(print, 'members'), '}'];
  }
}
