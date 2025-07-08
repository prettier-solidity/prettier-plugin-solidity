import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { ExpressionStatement } from './ExpressionStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ForStatementCondition extends SlangNode {
  readonly kind = NonterminalKind.ForStatementCondition;

  variant: ExpressionStatement | string;

  constructor(ast: ast.ForStatementCondition, options: ParserOptions<AstNode>) {
    super(ast);

    if (ast.variant instanceof TerminalNode) {
      this.variant = ast.variant.unparse();
      return;
    }
    this.variant = new ExpressionStatement(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ForStatementCondition>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
