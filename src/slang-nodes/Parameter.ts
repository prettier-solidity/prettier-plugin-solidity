import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { TypeName } from './TypeName.js';
import { StorageLocation } from './StorageLocation.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group } = doc.builders;

export class Parameter implements SlangNode {
  readonly kind = NonterminalKind.Parameter;

  comments;

  loc;

  typeName: TypeName;

  storageLocation?: StorageLocation;

  name?: Identifier;

  constructor(ast: ast.Parameter, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.typeName = new TypeName(ast.typeName, options);
    if (ast.storageLocation) {
      this.storageLocation = new StorageLocation(ast.storageLocation);
    }
    if (ast.name) {
      this.name = new Identifier(ast.name);
    }

    metadata = updateMetadata(metadata, [this.typeName, this.storageLocation]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<Parameter>, print: PrintFunction): Doc {
    return group(
      joinExisting(' ', [
        path.call(print, 'typeName'),
        path.call(print, 'storageLocation'),
        path.call(print, 'name')
      ])
    );
  }
}
