import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { BinaryOperation } from './BinaryOperation.js';

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

export class InequalityExpression extends BinaryOperation {
  readonly kind = NonterminalKind.InequalityExpression;

  constructor(ast: ast.InequalityExpression, collected: CollectedMetadata) {
    super(ast, collected);
  }

  print(
    print: PrintFunction,
    path: AstPath<InequalityExpression>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printComparisonExpression(this, path, print, options);
  }
}
