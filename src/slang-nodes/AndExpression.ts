import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class AndExpression extends SlangNode {
  readonly kind = NonterminalKind.AndExpression;

  leftOperand: Expression['variant'];

  operator: string;

  rightOperand: Expression['variant'];

  constructor(ast: ast.AndExpression, options: ParserOptions<AstNode>) {
    super(ast);

    this.leftOperand = extractVariant(new Expression(ast.leftOperand, options));
    this.operator = ast.operator.unparse();
    this.rightOperand = extractVariant(
      new Expression(ast.rightOperand, options)
    );

    this.updateMetadata(this.leftOperand, this.rightOperand);
  }

  print(
    path: AstPath<AndExpression>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    return printLogicalOperation(this, path, print, options);
  }
}
