import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';
import { StorageLocation } from './StorageLocation.js';

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

  name: string;

  constructor(
    ast: ast.TypedTupleMember,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new TypeName(ast.typeName, offsets[0], options);
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(
        ast.storageLocation,
        offsets[1]
      );
    }
    this.name = ast.name.text;

    metadata = updateMetadata(metadata, [this.typeName, this.storageLocation]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<TypedTupleMember>, print: PrintFunction): Doc {
    return [
      path.call(print, 'typeName'),
      this.storageLocation ? [' ', path.call(print, 'storageLocation')] : '',
      ` ${this.name}`
    ];
  }
}
