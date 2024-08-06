import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { /*AstPath,*/ Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types';

export class YulStackAssignmentStatement implements SlangNode {
  readonly kind = NonterminalKind.YulStackAssignmentStatement;

  comments;

  loc;

  assignment: YulAssignmentOperator;

  expression: YulExpression;

  constructor(
    ast: ast.YulStackAssignmentStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.assignment = new YulAssignmentOperator(ast.assignment, offsets[0]);
    this.expression = new YulExpression(ast.expression, offsets[1], options);

    metadata = updateMetadata(metadata, [this.assignment, this.expression]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  // TODO: implement print
  print(/*
    path: AstPath<YulStackAssignmentStatement>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  */): Doc {
    return ['TODO: YulStackAssignmentStatement'];
  }
}
