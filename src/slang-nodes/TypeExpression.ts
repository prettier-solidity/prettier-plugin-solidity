import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { TypeName } from './TypeName.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { /*AstPath,*/ Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class TypeExpression implements SlangNode {
  readonly kind = NonterminalKind.TypeExpression;

  comments;

  loc;

  typeKeyword: string;

  openParen: string;

  typeName: TypeName;

  closeParen: string;

  constructor(ast: ast.TypeExpression, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.typeKeyword = ast.typeKeyword.text;
    this.openParen = ast.openParen.text;
    this.typeName = new TypeName(ast.typeName, offsets[0], options);
    this.closeParen = ast.closeParen.text;

    metadata = updateMetadata(metadata, [this.typeName]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  // TODO: implement print
  print(/*
    path: AstPath,
    print: (path: AstPath) => Doc,
    options: ParserOptions
  */): Doc {
    return ['TODO: TypeExpression'];
  }
}
