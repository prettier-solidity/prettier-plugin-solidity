import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const tryToHug = createHugFunction(['==', '!=']);

const printEqualityExpression = printBinaryOperation(
  createKindCheckFunction([
    NonterminalKind.AndExpression,
    NonterminalKind.OrExpression
  ])
);

export class EqualityExpression implements SlangNode {
  readonly kind = NonterminalKind.EqualityExpression;

  comments;

  loc;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(ast: ast.EqualityExpression, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.leftOperand = new Expression(ast.leftOperand, options);
    this.operator = ast.operator.unparse();
    this.rightOperand = new Expression(ast.rightOperand, options);

    metadata = updateMetadata(metadata, [this.leftOperand, this.rightOperand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    this.leftOperand = tryToHug(this.leftOperand);
  }

  print(
    path: AstPath<EqualityExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printEqualityExpression(this, path, print, options);
  }
}
