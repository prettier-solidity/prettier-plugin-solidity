import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { ExpressionStatement } from './ExpressionStatement.js';
import { VariableDeclarationStatement } from './VariableDeclarationStatement.js';
import { TupleDeconstructionStatement } from './TupleDeconstructionStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ForStatementInitialization extends SlangNode {
  readonly kind = NonterminalKind.ForStatementInitialization;

  variant:
    | ExpressionStatement
    | VariableDeclarationStatement
    | TupleDeconstructionStatement
    | string;

  constructor(
    ast: ast.ForStatementInitialization,
    options: ParserOptions<AstNode>
  ) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof TerminalNode) {
      this.variant = variant.unparse();
      return;
    }
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.ExpressionStatement:
        this.variant = new ExpressionStatement(
          variant as ast.ExpressionStatement,
          options
        );
        break;
      case NonterminalKind.VariableDeclarationStatement:
        this.variant = new VariableDeclarationStatement(
          variant as ast.VariableDeclarationStatement,
          options
        );
        break;
      case NonterminalKind.TupleDeconstructionStatement:
        this.variant = new TupleDeconstructionStatement(
          variant as ast.TupleDeconstructionStatement,
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ForStatementInitialization>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
