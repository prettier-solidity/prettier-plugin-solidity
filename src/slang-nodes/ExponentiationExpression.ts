import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createBinaryOperationPrinter } from '../slang-printers/create-binary-operation-printer.js';
import { binaryIndentRulesBuilder } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

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

export class ExponentiationExpression extends SlangNode {
  readonly kind = NonterminalKind.ExponentiationExpression;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(
    ast: ast.ExponentiationExpression,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    this.leftOperand = new Expression(ast.leftOperand, options);
    this.operator = ast.operator.unparse();
    this.rightOperand = new Expression(ast.rightOperand, options);

    this.updateMetadata(this.leftOperand, this.rightOperand);

    this.rightOperand = tryToHug(this.rightOperand);
    this.leftOperand = tryToHug(this.leftOperand);
  }

  print(
    path: AstPath<ExponentiationExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printExponentiationExpression(this, path, print, options);
  }
}
