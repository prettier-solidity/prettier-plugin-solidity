import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class NamedArgument implements SlangNode {
  readonly kind = NonterminalKind.NamedArgument;

  comments;

  loc;

  name: string;

  colon: string;

  value: Expression;

  constructor(
    ast: ast.NamedArgument,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.name = ast.name.text;
    this.colon = ast.colon.text;
    this.value = new Expression(ast.value, offsets[0], options);

    metadata = updateMetadata(metadata, [this.value]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<NamedArgument>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [`${this.name}${this.colon} `, path.call(print, 'value')];
  }
}
