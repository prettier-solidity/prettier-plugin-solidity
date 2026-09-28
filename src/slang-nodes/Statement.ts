import { NonterminalKind, SlangAst } from '../slang-utils/slang.ts';
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

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.Statement,
  Statement
>(() => [
  [SlangAst.ExpressionStatement, ExpressionStatement],
  [SlangAst.VariableDeclarationStatement, VariableDeclarationStatement],
  [SlangAst.TupleDeconstructionStatement, TupleDeconstructionStatement],
  [SlangAst.IfStatement, IfStatement],
  [SlangAst.ForStatement, ForStatement],
  [SlangAst.WhileStatement, WhileStatement],
  [SlangAst.DoWhileStatement, DoWhileStatement],
  [SlangAst.ContinueStatement, ContinueStatement],
  [SlangAst.BreakStatement, BreakStatement],
  [SlangAst.ReturnStatement, ReturnStatement],
  [SlangAst.ThrowStatement, ThrowStatement],
  [SlangAst.EmitStatement, EmitStatement],
  [SlangAst.TryStatement, TryStatement],
  [SlangAst.RevertStatement, RevertStatement],
  [SlangAst.AssemblyStatement, AssemblyStatement],
  [SlangAst.UncheckedBlock, UncheckedBlock]
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

  constructor(ast: ast.Statement, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    this.variant =
      variant instanceof SlangAst.Block
        ? new Block(variant, collected)
        : createNonterminalVariant(variant, collected);

    this.updateMetadata(this.variant);
  }
}
