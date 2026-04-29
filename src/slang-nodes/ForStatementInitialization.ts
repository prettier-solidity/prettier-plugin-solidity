import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNode } from './PolymorphicNode.js';
import { ExpressionStatement } from './ExpressionStatement.js';
import { VariableDeclarationStatement } from './VariableDeclarationStatement.js';
import { TupleDeconstructionStatement } from './TupleDeconstructionStatement.js';

import type { CollectedMetadata } from '../types.d.ts';
import type { TerminalNode } from './TerminalNode.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
  ast.ForStatementInitialization,
  ForStatementInitialization
>([
  [ast.ExpressionStatement, ExpressionStatement],
  [ast.VariableDeclarationStatement, VariableDeclarationStatement],
  [ast.TupleDeconstructionStatement, TupleDeconstructionStatement]
]);

export class ForStatementInitialization extends PolymorphicNode<
  ast.ForStatementInitialization,
  | ExpressionStatement
  | VariableDeclarationStatement
  | TupleDeconstructionStatement
  | TerminalNode
> {
  readonly kind = NonterminalKind.ForStatementInitialization;

  constructor(
    ast: ast.ForStatementInitialization,
    collected: CollectedMetadata
  ) {
    super(ast, collected, (variant) =>
      createNonterminalVariant(variant, collected)
    );
  }
}
