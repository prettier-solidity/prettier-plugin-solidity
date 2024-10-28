import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { TypeName } from './TypeName.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class ErrorParameter implements SlangNode {
  readonly kind = NonterminalKind.ErrorParameter;

  comments;

  loc;

  typeName: TypeName;

  name?: Identifier;

  constructor(ast: ast.ErrorParameter, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.typeName = new TypeName(ast.typeName, options);
    if (ast.name) {
      this.name = new Identifier(ast.name);
    }

    metadata = updateMetadata(metadata, [this.typeName]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ErrorParameter>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'typeName'),
      path.call(print, 'name')
    ]);
  }
}
