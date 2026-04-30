import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

const printComparisonExpression = printBinaryOperation(
  createKindCheckFunction([
    NonterminalKind.EqualityExpression,
    NonterminalKind.AndExpression,
    NonterminalKind.OrExpression
  ])
);

export class InequalityExpression extends SlangNode {
  readonly kind = NonterminalKind.InequalityExpression;

  leftOperand: Expression['variant'];

  operator: string;

  rightOperand: Expression['variant'];

  constructor(ast: ast.InequalityExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.leftOperand = extractVariant(
      new Expression(ast.leftOperand, collected)
    );
    this.operator = ast.operator.unparse();
    this.rightOperand = extractVariant(
      new Expression(ast.rightOperand, collected)
    );

    this.updateMetadata(this.leftOperand, this.rightOperand);
  }

  print(
    print: PrintFunction,
    path: AstPath<InequalityExpression>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printComparisonExpression(this, path, print, options);
  }
}
