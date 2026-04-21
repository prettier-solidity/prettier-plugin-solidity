import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { BinaryOperation } from './BinaryOperation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const hugFunctions = {
  '*': createHugFunction(['/', '%']),
  '/': createHugFunction(['*', '%']),
  '%': createHugFunction(['*', '/', '%'])
};

const printMultiplicativeExpression = printBinaryOperation(
  createKindCheckFunction([
    NonterminalKind.AdditiveExpression,
    NonterminalKind.ShiftExpression,
    NonterminalKind.BitwiseAndExpression,
    NonterminalKind.BitwiseOrExpression,
    NonterminalKind.BitwiseXorExpression,
    NonterminalKind.InequalityExpression,
    NonterminalKind.EqualityExpression,
    NonterminalKind.AndExpression,
    NonterminalKind.OrExpression
  ])
);

export class MultiplicativeExpression extends BinaryOperation {
  readonly kind = NonterminalKind.MultiplicativeExpression;

  constructor(ast: ast.MultiplicativeExpression, collected: CollectedMetadata) {
    super(ast, collected);

    const tryToHug = hugFunctions[this.operator as keyof typeof hugFunctions];

    if (tryToHug === undefined) {
      throw new Error(`Unexpected operator: ${this.operator}`);
    }

    this.leftOperand = tryToHug(this.leftOperand);
  }

  print(
    print: PrintFunction,
    path: AstPath<MultiplicativeExpression>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printMultiplicativeExpression(this, path, print, options);
  }
}
