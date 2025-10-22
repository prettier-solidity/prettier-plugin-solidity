import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const tryToHug = createHugFunction(['%']);

const printAdditiveExpression = printBinaryOperation(
  createKindCheckFunction([
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

export class AdditiveExpression extends SlangNode {
  readonly kind = NonterminalKind.AdditiveExpression;

  leftOperand: Expression['variant'];

  operator: string;

  rightOperand: Expression['variant'];

  constructor(ast: ast.AdditiveExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.leftOperand = extractVariant(new Expression(ast.leftOperand, options));
    this.operator = ast.operator.unparse();
    this.rightOperand = extractVariant(
      new Expression(ast.rightOperand, options)
    );

    this.updateMetadata(this.leftOperand, this.rightOperand);

    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
  }

  print(
    path: AstPath<AdditiveExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printAdditiveExpression(this, path, print, options);
  }
}
