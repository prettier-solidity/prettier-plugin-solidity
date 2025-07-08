import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { TypeName } from './TypeName.js';
import { StorageLocation } from './StorageLocation.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class TypedTupleMember extends SlangNode {
  readonly kind = NonterminalKind.TypedTupleMember;

  typeName: TypeName;

  storageLocation?: StorageLocation;

  name: Identifier;

  constructor(ast: ast.TypedTupleMember, options: ParserOptions<AstNode>) {
    super(ast);

    this.typeName = new TypeName(ast.typeName, options);
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(ast.storageLocation);
    }
    this.name = new Identifier(ast.name);

    this.updateMetadata(this.typeName, this.storageLocation);
  }

  print(path: AstPath<TypedTupleMember>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'typeName'),
      path.call(print, 'storageLocation'),
      path.call(print, 'name')
    ]);
  }
}
