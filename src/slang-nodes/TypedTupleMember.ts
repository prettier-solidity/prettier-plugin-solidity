import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { TypeName } from './TypeName.js';
import { StorageLocation } from './StorageLocation.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class TypedTupleMember implements SlangNode {
  readonly kind = NonterminalKind.TypedTupleMember;

  comments;

  loc;

  typeName: TypeName;

  storageLocation?: StorageLocation;

  name: Identifier;

  constructor(
    ast: ast.TypedTupleMember,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new TypeName(ast.typeName, offsets[0], options);
    let i = 1;
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(
        ast.storageLocation,
        offsets[i]
      );
      i += 1;
    }
    this.name = new Identifier(ast.name, offsets[i]);

    metadata = updateMetadata(metadata, [this.typeName, this.storageLocation]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<TypedTupleMember>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'typeName'),
      path.call(print, 'storageLocation'),
      path.call(print, 'name')
    ]);
  }
}
