import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './index.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const tryToHugLeftOperand = createHugFunction([
  '+',
  '-',
  '*',
  '/',
  '**',
  '<<',
  '>>'
]);
const tryToHugRightOperand = createHugFunction(['+', '-', '*', '/', '**']);

export class ShiftExpression implements SlangNode {
  readonly kind = NonterminalKind.ShiftExpression;

  comments;

  loc;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(
    ast: ast.ShiftExpression,
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

    this.leftOperand = tryToHugLeftOperand(this.leftOperand);
    this.rightOperand = tryToHugRightOperand(this.rightOperand);
  }

  print(
    path: AstPath<ShiftExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printBinaryOperation(this, path, print, options);
  }
}
