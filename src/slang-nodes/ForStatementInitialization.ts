import * as ast from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { ExpressionStatement } from './ExpressionStatement.js';
import { VariableDeclarationStatement } from './VariableDeclarationStatement.js';
import { TupleDeconstructionStatement } from './TupleDeconstructionStatement.js';
import { TerminalNode } from './TerminalNode.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: Exclude<
    ast.ForStatementInitialization['variant'],
    SlangTerminalNode
  >,
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): Exclude<ForStatementInitialization['variant'], TerminalNode> {
  if (variant instanceof ast.ExpressionStatement) {
    return new ExpressionStatement(variant, collected, options);
  }
  if (variant instanceof ast.VariableDeclarationStatement) {
    return new VariableDeclarationStatement(variant, collected, options);
  }
  if (variant instanceof ast.TupleDeconstructionStatement) {
    return new TupleDeconstructionStatement(variant, collected, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class ForStatementInitialization extends SlangNode {
  readonly kind = NonterminalKind.ForStatementInitialization;

  variant:
    | ExpressionStatement
    | VariableDeclarationStatement
    | TupleDeconstructionStatement
    | TerminalNode;

  constructor(
    ast: ast.ForStatementInitialization,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = createNonterminalVariant(variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
