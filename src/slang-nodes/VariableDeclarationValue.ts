import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class VariableDeclarationValue implements SlangNode {
  readonly kind = NonterminalKind.VariableDeclarationValue;

  comments;

  loc;

  equal: string;

  expression: Expression;

  constructor(
    ast: ast.VariableDeclarationValue,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.equal = ast.equal.text;
    this.expression = new Expression(ast.expression, offsets[0], options);

    metadata = updateMetadata(metadata, [this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<VariableDeclarationValue>,
    print: (path: AstPath<AstNode>) => Doc
  ): Doc {
    return [` ${this.equal} `, path.call(print, 'expression')];
  }
}
