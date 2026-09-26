import * as ast from '@nomicfoundation/slang/ast';
import {
  NonterminalKind,
  TerminalNode as SlangTerminalNode
} from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { ExpressionStatement } from './ExpressionStatement.ts';
import { VariableDeclarationStatement } from './VariableDeclarationStatement.ts';
import { TupleDeconstructionStatement } from './TupleDeconstructionStatement.ts';
import { TerminalNode } from './TerminalNode.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.ForStatementInitialization,
  ForStatementInitialization
>([
  [ast.ExpressionStatement, ExpressionStatement],
  [ast.VariableDeclarationStatement, VariableDeclarationStatement],
  [ast.TupleDeconstructionStatement, TupleDeconstructionStatement]
]);

export class ForStatementInitialization extends SlangNode {
  readonly kind = NonterminalKind.ForStatementInitialization;

  variant:
    | ExpressionStatement
    | VariableDeclarationStatement
    | TupleDeconstructionStatement
    | TerminalNode;

  constructor(
    ast: ast.ForStatementInitialization,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    const variant = ast.variant;
    if (variant instanceof SlangTerminalNode) {
      this.variant = new TerminalNode(variant, collected);
      return;
    }
    this.variant = createNonterminalVariant(variant, collected);

    this.updateMetadata(this.variant);
  }
}
