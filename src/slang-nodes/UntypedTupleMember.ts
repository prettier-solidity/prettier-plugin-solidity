import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { StorageLocation } from './StorageLocation.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class UntypedTupleMember extends SlangNode {
  readonly kind = NonterminalKind.UntypedTupleMember;

  storageLocation?: StorageLocation;

  name: Identifier;

  constructor(ast: ast.UntypedTupleMember) {
    super(ast);

    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(ast.storageLocation);
    }
    this.name = new Identifier(ast.name);

    this.updateMetadata(this.storageLocation);
  }

  print(path: AstPath<UntypedTupleMember>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'storageLocation'),
      path.call(print, 'name')
    ]);
  }
}
