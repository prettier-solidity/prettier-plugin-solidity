import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { ExpressionStatement } from './ExpressionStatement.js';
import { VariableDeclarationStatement } from './VariableDeclarationStatement.js';
import { TupleDeconstructionStatement } from './TupleDeconstructionStatement.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: Exclude<ast.ForStatementInitialization['variant'], TerminalNode>,
  options: ParserOptions<AstNode>
): Exclude<ForStatementInitialization['variant'], string> {
  if (variant instanceof ast.ExpressionStatement) {
    return new ExpressionStatement(variant, options);
  }
  if (variant instanceof ast.VariableDeclarationStatement) {
    return new VariableDeclarationStatement(variant, options);
  }
  if (variant instanceof ast.TupleDeconstructionStatement) {
    return new TupleDeconstructionStatement(variant, options);
  }
  const exhaustiveCheck: never = variant;
  return exhaustiveCheck;
}

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
    this.variant = createNonterminalVariant(variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<ForStatementInitialization>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
