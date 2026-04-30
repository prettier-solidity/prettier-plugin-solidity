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
import type { PrintableNode } from './types.d.ts';

const tryToHug = createHugFunction(['+', '-', '*', '/', '**', '<<', '>>']);

const printBitwiseAndExpression = printBinaryOperation(
  createKindCheckFunction([
    NonterminalKind.InequalityExpression,
    NonterminalKind.EqualityExpression,
    NonterminalKind.AndExpression,
    NonterminalKind.OrExpression
  ])
);

export class BitwiseAndExpression extends SlangNode {
  readonly kind = NonterminalKind.BitwiseAndExpression;

  leftOperand: Expression['variant'];

  operator: string;

  rightOperand: Expression['variant'];

  constructor(ast: ast.BitwiseAndExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.leftOperand = extractVariant(
      new Expression(ast.leftOperand, collected)
    );
    this.operator = ast.operator.unparse();
    this.rightOperand = extractVariant(
      new Expression(ast.rightOperand, collected)
    );

    this.updateMetadata(this.leftOperand, this.rightOperand);

    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
  }

  print(
    print: PrintFunction,
    path: AstPath<BitwiseAndExpression>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printBitwiseAndExpression(this, path, print, options);
  }
}
