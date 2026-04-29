import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantSimpleCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNode } from './PolymorphicNode.js';
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

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantSimpleCreator<
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

export class Statement extends PolymorphicNode<
  slangAst.Statement,
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
  | UncheckedBlock
> {
  readonly kind = NonterminalKind.Statement;

  constructor(ast: slangAst.Statement, collected: CollectedMetadata) {
    super(ast, collected, (variant) =>
      variant instanceof slangAst.Block
        ? new Block(variant, collected)
        : createNonterminalVariant(variant, collected)
    );
  }
}
