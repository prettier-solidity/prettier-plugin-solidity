import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printLogicalOperation } from '../slang-printers/print-logical-operation.js';
import { BinaryOperation } from './BinaryOperation.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class AndExpression extends BinaryOperation {
  readonly kind = NonterminalKind.AndExpression;

  constructor(ast: ast.AndExpression, collected: CollectedMetadata) {
    super(ast, collected);
  }

  print(
    print: PrintFunction,
    path: AstPath<AndExpression>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printLogicalOperation(this, path, print, options);
  }
}
