import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { createBinaryOperationPrinter } from '../slang-printers/create-binary-operation-printer.js';
import { binaryIndentRulesBuilder } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { BinaryOperation } from './BinaryOperation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const { group } = doc.builders;

const tryToHug = createHugFunction(['**']);

const shouldIndent = createKindCheckFunction([
  NonterminalKind.MultiplicativeExpression,
  NonterminalKind.AdditiveExpression,
  NonterminalKind.ShiftExpression,
  NonterminalKind.BitwiseAndExpression,
  NonterminalKind.BitwiseOrExpression,
  NonterminalKind.BitwiseXorExpression,
  NonterminalKind.InequalityExpression,
  NonterminalKind.EqualityExpression,
  NonterminalKind.AndExpression,
  NonterminalKind.OrExpression
]);

const printExponentiationExpression = createBinaryOperationPrinter(
  () =>
    (document: Doc): Doc =>
      group(document), // always group
  binaryIndentRulesBuilder(shouldIndent) // indent as a binary operation with some exceptions
);

export class ExponentiationExpression extends BinaryOperation {
  readonly kind = NonterminalKind.ExponentiationExpression;

  constructor(ast: ast.ExponentiationExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.rightOperand = tryToHug(this.rightOperand);
    this.leftOperand = tryToHug(this.leftOperand);
  }

  print(
    print: PrintFunction,
    path: AstPath<ExponentiationExpression>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printExponentiationExpression(this, path, print, options);
  }
}
