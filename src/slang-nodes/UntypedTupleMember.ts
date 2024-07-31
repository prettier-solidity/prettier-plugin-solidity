import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { StorageLocation } from './StorageLocation.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { /*AstPath,*/ Doc /*, ParserOptions*/ } from 'prettier';
import type { SlangNode } from '../types.js';

export class UntypedTupleMember implements SlangNode {
  readonly kind = NonterminalKind.UntypedTupleMember;

  comments;

  loc;

  storageLocation?: StorageLocation;

  name: string;

  constructor(ast: ast.UntypedTupleMember, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(
        ast.storageLocation,
        offsets[0]
      );
    }
    this.name = ast.name.text;

    metadata = updateMetadata(metadata, [this.storageLocation]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  // TODO: implement print
  print(/*
    path: AstPath,
    print: (path: AstPath) => Doc,
    options: ParserOptions<AstNode>
  */): Doc {
    return ['TODO: UntypedTupleMemberUntypedTupleMember'];
  }
}
