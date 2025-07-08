import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { MappingKeyType } from './MappingKeyType.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class MappingKey implements SlangNode {
  readonly kind = NonterminalKind.MappingKey;

  comments;

  loc;

  keyType: MappingKeyType;

  name?: Identifier;

  constructor(ast: ast.MappingKey) {
    const metadata = getNodeMetadata(ast);

    this.keyType = new MappingKeyType(ast.keyType);
    if (ast.name) {
      this.name = new Identifier(ast.name);
    }

    [this.loc, this.comments] = updateMetadata(metadata, [this.keyType]);
  }

  print(path: AstPath<MappingKey>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'keyType'),
      path.call(print, 'name')
    ]);
  }
}
