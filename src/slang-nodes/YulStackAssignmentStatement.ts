import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulAssignmentOperator } from './YulAssignmentOperator.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { /*AstPath,*/ Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

export class YulStackAssignmentStatement implements SlangNode {
  readonly kind = NonterminalKind.YulStackAssignmentStatement;

  comments;

  loc;

  assignment: YulAssignmentOperator;

  expression: YulExpression;

  constructor(
    ast: ast.YulStackAssignmentStatement,
    offset: number,
    options: ParserOptions
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
    path: AstPath,
    print: (path: AstPath) => Doc,
    options: ParserOptions
  */): Doc {
    return ['TODO: YulStackAssignmentStatement'];
  }
}
