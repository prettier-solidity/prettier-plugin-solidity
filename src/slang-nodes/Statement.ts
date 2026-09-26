import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { ExpressionStatement } from './ExpressionStatement.ts';
import { VariableDeclarationStatement } from './VariableDeclarationStatement.ts';
import { TupleDeconstructionStatement } from './TupleDeconstructionStatement.ts';
import { IfStatement } from './IfStatement.ts';
import { ForStatement } from './ForStatement.ts';
import { WhileStatement } from './WhileStatement.ts';
import { DoWhileStatement } from './DoWhileStatement.ts';
import { ContinueStatement } from './ContinueStatement.ts';
import { BreakStatement } from './BreakStatement.ts';
import { ReturnStatement } from './ReturnStatement.ts';
import { ThrowStatement } from './ThrowStatement.ts';
import { EmitStatement } from './EmitStatement.ts';
import { TryStatement } from './TryStatement.ts';
import { RevertStatement } from './RevertStatement.ts';
import { AssemblyStatement } from './AssemblyStatement.ts';
import { Block } from './Block.ts';
import { UncheckedBlock } from './UncheckedBlock.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  slangAst.Statement,
  Statement
>([
  [slangAst.ExpressionStatement, ExpressionStatement],
  [slangAst.VariableDeclarationStatement, VariableDeclarationStatement],
  [slangAst.TupleDeconstructionStatement, TupleDeconstructionStatement],
  [slangAst.IfStatement, IfStatement],
  [slangAst.ForStatement, ForStatement],
  [slangAst.WhileStatement, WhileStatement],
  [slangAst.DoWhileStatement, DoWhileStatement],
  [slangAst.ContinueStatement, ContinueStatement],
  [slangAst.BreakStatement, BreakStatement],
  [slangAst.ReturnStatement, ReturnStatement],
  [slangAst.ThrowStatement, ThrowStatement],
  [slangAst.EmitStatement, EmitStatement],
  [slangAst.TryStatement, TryStatement],
  [slangAst.RevertStatement, RevertStatement],
  [slangAst.AssemblyStatement, AssemblyStatement],
  [slangAst.UncheckedBlock, UncheckedBlock]
]);

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

  constructor(ast: slangAst.Statement, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    this.variant =
      variant instanceof slangAst.Block
        ? new Block(variant, collected)
        : createNonterminalVariant(variant, collected);

    this.updateMetadata(this.variant);
  }
}
