import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printBinaryOperation } from '../slang-printers/print-binary-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const multiplicationTryToHug = createHugFunction(['/', '%']);
const divisionTryToHug = createHugFunction(['*', '%']);
const moduloTryToHug = createHugFunction(['*', '/', '%']);

export class MultiplicativeExpression implements SlangNode {
  readonly kind = NonterminalKind.MultiplicativeExpression;

  comments;

  loc;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(
    ast: ast.MultiplicativeExpression,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast);

    this.leftOperand = new Expression(ast.leftOperand, options);
    this.operator = ast.operator.unparse();
    this.rightOperand = new Expression(ast.rightOperand, options);

    metadata = updateMetadata(metadata, [this.leftOperand, this.rightOperand]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;

    switch (this.operator) {
      case '*':
        this.leftOperand = multiplicationTryToHug(this.leftOperand);
        break;
      case '/':
        this.leftOperand = divisionTryToHug(this.leftOperand);
        break;
      case '%':
        this.leftOperand = moduloTryToHug(this.leftOperand);
        break;
      default:
        throw new Error(`Unexpected operator: ${this.operator}`);
    }
  }

  print(
    path: AstPath<MultiplicativeExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printBinaryOperation(this, path, print, options);
  }
}
