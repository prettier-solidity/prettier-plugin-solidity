import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { BinaryOperation } from './BinaryOperation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

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

const printShiftExpression = printBinaryOperation(
  createKindCheckFunction([
    NonterminalKind.BitwiseAndExpression,
    NonterminalKind.BitwiseOrExpression,
    NonterminalKind.BitwiseXorExpression,
    NonterminalKind.InequalityExpression,
    NonterminalKind.EqualityExpression,
    NonterminalKind.AndExpression,
    NonterminalKind.OrExpression
  ])
);

export class ShiftExpression extends BinaryOperation {
  readonly kind = NonterminalKind.ShiftExpression;

  constructor(ast: ast.ShiftExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.leftOperand = tryToHugLeftOperand(this.leftOperand);
    this.rightOperand = tryToHugRightOperand(this.rightOperand);
  }

  print(
    print: PrintFunction,
    path: AstPath<ShiftExpression>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printShiftExpression(this, path, print, options);
  }
}
