import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './index.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class StructMember implements SlangNode {
  readonly kind = NonterminalKind.StructMember;

  comments;

  loc;

  typeName: TypeName;

  name: Identifier;

  constructor(
    ast: ast.StructMember,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new TypeName(ast.typeName, offsets[0], options);
    this.name = new Identifier(ast.name, offsets[1]);

    metadata = updateMetadata(metadata, [this.typeName]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<StructMember>, print: PrintFunction): Doc {
    return [path.call(print, 'typeName'), ' ', path.call(print, 'name'), ';'];
  }
}