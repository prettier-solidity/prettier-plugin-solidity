import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { MappingKeyType } from './MappingKeyType.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class MappingKey implements SlangNode {
  readonly kind = NonterminalKind.MappingKey;

  comments;

  loc;

  keyType: MappingKeyType;

  name?: string;

  constructor(ast: ast.MappingKey, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.keyType = new MappingKeyType(ast.keyType, offsets[0]);
    this.name = ast.name?.text;

    metadata = updateMetadata(metadata, [this.keyType]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<MappingKey>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [path.call(print, 'keyType'), this.name ? ` ${this.name}` : ''];
  }
}
