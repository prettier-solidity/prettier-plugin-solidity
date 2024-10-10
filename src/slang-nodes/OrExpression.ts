import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './index.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const tryToHug = createHugFunction(['&&']);

export class OrExpression implements SlangNode {
  readonly kind = NonterminalKind.OrExpression;

  comments;

  loc;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(
    ast: ast.OrExpression,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.leftOperand = new Expression(ast.leftOperand, offsets[0], options);
    this.operator = ast.operator.unparse();
    this.rightOperand = new Expression(ast.rightOperand, offsets[1], options);

    metadata = updateMetadata(metadata, [this.leftOperand, this.rightOperand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
  }

  print(
    path: AstPath<OrExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printLogicalOperation(this, path, print, options);
  }
}
