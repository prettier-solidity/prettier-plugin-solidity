import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { TypeName } from './TypeName.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class MappingValue implements SlangNode {
  readonly kind = NonterminalKind.MappingValue;

  comments;

  loc;

  typeName: TypeName;

  name?: Identifier;

  constructor(ast: ast.MappingValue, options: ParserOptions<AstNode>) {
    const metadata = getNodeMetadata(ast);

    this.typeName = new TypeName(ast.typeName, options);
    if (ast.name) {
      this.name = new Identifier(ast.name);
    }

    [this.loc, this.comments] = updateMetadata(metadata, [this.typeName]);
  }

  print(path: AstPath<MappingValue>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'typeName'),
      path.call(print, 'name')
    ]);
  }
}
