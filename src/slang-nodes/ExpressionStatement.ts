import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class ExpressionStatement implements SlangNode {
  readonly kind = NonterminalKind.ExpressionStatement;

  comments;

  loc;

  expression: Expression;

  constructor(
    ast: ast.ExpressionStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.expression = new Expression(ast.expression, offsets[0], options);

    metadata = updateMetadata(metadata, [this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<ExpressionStatement>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [path.call(print, 'expression'), ';'];
  }
}
