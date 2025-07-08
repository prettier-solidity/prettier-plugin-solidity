import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { MappingKeyType } from './MappingKeyType.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class MappingKey extends SlangNode {
  readonly kind = NonterminalKind.MappingKey;

  keyType: MappingKeyType;

  name?: Identifier;

  constructor(ast: ast.MappingKey) {
    super(ast);

    this.keyType = new MappingKeyType(ast.keyType);
    if (ast.name) {
      this.name = new Identifier(ast.name);
    }

    this.updateMetadata(this.keyType);
  }

  print(path: AstPath<MappingKey>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'keyType'),
      path.call(print, 'name')
    ]);
  }
}
