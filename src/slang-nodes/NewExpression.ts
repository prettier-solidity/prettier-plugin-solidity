import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class NewExpression implements SlangNode {
  readonly kind = NonterminalKind.NewExpression;

  comments;

  loc;

  newKeyword: string;

  typeName: TypeName;

  constructor(
    ast: ast.NewExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.newKeyword = ast.newKeyword.text;
    this.typeName = new TypeName(ast.typeName, offsets[0], options);

    metadata = updateMetadata(metadata, [this.typeName]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<NewExpression>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [`${this.newKeyword} `, path.call(print, 'typeName')];
  }
}
