import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { MappingKeyType } from './MappingKeyType.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class MappingKey implements SlangNode {
  readonly kind = NonterminalKind.MappingKey;

  comments;

  loc;

  keyType: MappingKeyType;

  name?: Identifier;

  constructor(ast: ast.MappingKey, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.keyType = new MappingKeyType(ast.keyType, offsets[0]);
    if (ast.name) {
      this.name = new Identifier(ast.name, offsets[1]);
    }

    metadata = updateMetadata(metadata, [this.keyType]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<MappingKey>, print: PrintFunction): Doc {
    return [
      path.call(print, 'keyType'),
      this.name ? [' ', path.call(print, 'name')] : ''
    ];
  }
}
