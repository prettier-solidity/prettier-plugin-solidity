import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { TypeName } from './TypeName.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class MappingValue implements SlangNode {
  readonly kind = NonterminalKind.MappingValue;

  comments;

  loc;

  typeName: TypeName;

  name?: Identifier;

  constructor(
    ast: ast.MappingValue,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new TypeName(ast.typeName, offsets[0], options);
    if (ast.name) {
      this.name = new Identifier(ast.name, offsets[1]);
    }

    metadata = updateMetadata(metadata, [this.typeName]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<MappingValue>, print: PrintFunction): Doc {
    return joinExisting(' ', [
      path.call(print, 'typeName'),
      path.call(print, 'name')
    ]);
  }
}