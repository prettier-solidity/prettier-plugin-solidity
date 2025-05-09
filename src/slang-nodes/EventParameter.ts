import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { TypeName } from './TypeName.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class EventParameter implements SlangNode {
  readonly kind = NonterminalKind.EventParameter;

  comments;

  loc;

  typeName: TypeName;

  indexedKeyword?: string;

  name?: Identifier;

  constructor(ast: ast.EventParameter) {
    let metadata = getNodeMetadata(ast);

    this.typeName = new TypeName(ast.typeName);
    this.indexedKeyword = ast.indexedKeyword?.unparse();
    if (ast.name) {
      this.name = new Identifier(ast.name);
    }

    metadata = updateMetadata(metadata, [this.typeName]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<EventParameter>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'typeName'),
      this.indexedKeyword,
      path.call(print, 'name')
    ]);
  }
}
