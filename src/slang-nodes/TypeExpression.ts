import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './index.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class TypeExpression implements SlangNode {
  readonly kind = NonterminalKind.TypeExpression;

  comments;

  loc;

  typeName: TypeName;

  constructor(
    ast: ast.TypeExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeName = new TypeName(ast.typeName, offsets[0], options);

    metadata = updateMetadata(metadata, [this.typeName]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<TypeExpression>, print: PrintFunction): Doc {
    return ['type(', path.call(print, 'typeName'), ')'];
  }
}