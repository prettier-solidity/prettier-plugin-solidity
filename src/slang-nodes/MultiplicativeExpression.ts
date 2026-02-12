import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const hugFunctions = {
  '*': createHugFunction(['/', '%']),
  '/': createHugFunction(['*', '%']),
  '%': createHugFunction(['*', '/', '%'])
} as const;

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

export class MultiplicativeExpression extends SlangNode {
  readonly kind = NonterminalKind.MultiplicativeExpression;

  leftOperand: Expression['variant'];

  operator: string;

  rightOperand: Expression['variant'];

  constructor(
    ast: ast.MultiplicativeExpression,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.leftOperand = extractVariant(
      new Expression(ast.leftOperand, collected, options)
    );
    this.operator = ast.operator.unparse();
    this.rightOperand = extractVariant(
      new Expression(ast.rightOperand, collected, options)
    );

    this.updateMetadata(this.leftOperand, this.rightOperand);

    const tryToHug = hugFunctions[this.operator as '*' | '/' | '%'];

    if (tryToHug === undefined) {
      throw new Error(`Unexpected operator: ${this.operator}`);
    }

    this.leftOperand = tryToHug(this.leftOperand);
  }

  print(
    path: AstPath<MultiplicativeExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printMultiplicativeExpression(this, path, print, options);
  }
}
