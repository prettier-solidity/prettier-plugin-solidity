import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { SlangNode } from './SlangNode.js';
import { ExpressionStatement } from './ExpressionStatement.js';
import { VariableDeclarationStatement } from './VariableDeclarationStatement.js';
import { TupleDeconstructionStatement } from './TupleDeconstructionStatement.js';
import { IfStatement } from './IfStatement.js';
import { ForStatement } from './ForStatement.js';
import { WhileStatement } from './WhileStatement.js';
import { DoWhileStatement } from './DoWhileStatement.js';
import { ContinueStatement } from './ContinueStatement.js';
import { BreakStatement } from './BreakStatement.js';
import { ReturnStatement } from './ReturnStatement.js';
import { ThrowStatement } from './ThrowStatement.js';
import { EmitStatement } from './EmitStatement.js';
import { TryStatement } from './TryStatement.js';
import { RevertStatement } from './RevertStatement.js';
import { AssemblyStatement } from './AssemblyStatement.js';
import { Block } from './Block.js';
import { UncheckedBlock } from './UncheckedBlock.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const createNonterminalVariantInternal = createNonterminalVariantCreator<
  Statement,
  ast.Statement
>([
  [ast.ExpressionStatement, ExpressionStatement],
  [ast.VariableDeclarationStatement, VariableDeclarationStatement],
  [ast.TupleDeconstructionStatement, TupleDeconstructionStatement],
  [ast.IfStatement, IfStatement],
  [ast.ForStatement, ForStatement],
  [ast.WhileStatement, WhileStatement],
  [ast.DoWhileStatement, DoWhileStatement],
  [ast.ContinueStatement, ContinueStatement],
  [ast.BreakStatement, BreakStatement],
  [ast.ReturnStatement, ReturnStatement],
  [ast.ThrowStatement, ThrowStatement],
  [ast.EmitStatement, EmitStatement],
  [ast.TryStatement, TryStatement],
  [ast.RevertStatement, RevertStatement],
  [ast.AssemblyStatement, AssemblyStatement],
  [ast.UncheckedBlock, UncheckedBlock]
]);

function createNonterminalVariant(
  variant: ast.Statement['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): Statement['variant'] {
  if (variant instanceof ast.Block) {
    return new Block(variant, collected, options);
  }

  return createNonterminalVariantInternal(variant, collected, options);
}

export class Statement extends SlangNode {
  readonly kind = NonterminalKind.Statement;

  variant:
    | ExpressionStatement
    | VariableDeclarationStatement
    | TupleDeconstructionStatement
    | IfStatement
    | ForStatement
    | WhileStatement
    | DoWhileStatement
    | ContinueStatement
    | BreakStatement
    | ReturnStatement
    | ThrowStatement
    | EmitStatement
    | TryStatement
    | RevertStatement
    | AssemblyStatement
    | Block
    | UncheckedBlock;

  constructor(
    ast: ast.Statement,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
