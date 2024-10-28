import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { StorageLocation } from './StorageLocation.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class UntypedTupleMember implements SlangNode {
  readonly kind = NonterminalKind.UntypedTupleMember;

  comments;

  loc;

  storageLocation?: StorageLocation;

  name: Identifier;

  constructor(ast: ast.UntypedTupleMember) {
    let metadata = getNodeMetadata(ast);

    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(ast.storageLocation);
    }
    this.name = new Identifier(ast.name);

    metadata = updateMetadata(metadata, [this.storageLocation]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<UntypedTupleMember>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'storageLocation'),
      path.call(print, 'name')
    ]);
  }
}
