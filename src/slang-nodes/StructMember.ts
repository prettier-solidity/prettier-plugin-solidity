import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';
import { Identifier } from './Identifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class StructMember implements SlangNode {
  readonly kind = NonterminalKind.StructMember;

  comments;

  loc;

  typeName: TypeName;

  name: Identifier;

  constructor(ast: ast.StructMember, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.typeName = new TypeName(ast.typeName, options);
    this.name = new Identifier(ast.name);

    metadata = updateMetadata(metadata, [this.typeName]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<StructMember>, print: PrintFunction): Doc {
    return [path.call(print, 'typeName'), ' ', path.call(print, 'name'), ';'];
  }
}
