const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { createHugFunction } from '../slang-utils/create-hug-function.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const tryToHug = createHugFunction(['&&']);

export class OrExpression extends SlangNode {
  readonly kind = NonterminalKind.OrExpression;

  leftOperand: Expression;

  operator: string;

  rightOperand: Expression;

  constructor(ast: ast.OrExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.leftOperand = new Expression(ast.leftOperand, options);
    this.operator = ast.operator.unparse();
    this.rightOperand = new Expression(ast.rightOperand, options);

    this.updateMetadata(this.leftOperand, this.rightOperand);

    this.leftOperand = tryToHug(this.leftOperand);
    this.rightOperand = tryToHug(this.rightOperand);
  }

  print(
    path: AstPath<OrExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printLogicalOperation(this, path, print, options);
  }
}
