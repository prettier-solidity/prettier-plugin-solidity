import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { createKindCheckFunction } from '../slang-utils/create-kind-check-function.js';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const tryToHug = createHugFunction(['==', '!=']);

const printEqualityExpression = printBinaryOperation(
  createKindCheckFunction([
    NonterminalKind.AndExpression,
    NonterminalKind.OrExpression
  ])
);

export class EqualityExpression extends SlangNode {
  readonly kind = NonterminalKind.EqualityExpression;

  leftOperand: Expression['variant'];

  operator: string;

  rightOperand: Expression['variant'];

  constructor(ast: ast.EqualityExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.leftOperand = extractVariant(new Expression(ast.leftOperand, options));
    this.operator = ast.operator.unparse();
    this.rightOperand = extractVariant(
      new Expression(ast.rightOperand, options)
    );

    this.updateMetadata(this.leftOperand, this.rightOperand);

    this.leftOperand = tryToHug(this.leftOperand);
  }

  print(
    path: AstPath<EqualityExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printEqualityExpression(this, path, print, options);
  }
}
