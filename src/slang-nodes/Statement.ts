import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
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
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.Statement['variant'],
  options: ParserOptions<AstNode>
): Statement['variant'] {
  if (variant instanceof ast.ExpressionStatement) {
    return new ExpressionStatement(variant, options);
  }
  if (variant instanceof ast.VariableDeclarationStatement) {
    return new VariableDeclarationStatement(variant, options);
  }
  if (variant instanceof ast.TupleDeconstructionStatement) {
    return new TupleDeconstructionStatement(variant, options);
  }
  if (variant instanceof ast.IfStatement) {
    return new IfStatement(variant, options);
  }
  if (variant instanceof ast.ForStatement) {
    return new ForStatement(variant, options);
  }
  if (variant instanceof ast.WhileStatement) {
    return new WhileStatement(variant, options);
  }
  if (variant instanceof ast.DoWhileStatement) {
    return new DoWhileStatement(variant, options);
  }
  if (variant instanceof ast.ContinueStatement) {
    return new ContinueStatement(variant);
  }
  if (variant instanceof ast.BreakStatement) {
    return new BreakStatement(variant);
  }
  if (variant instanceof ast.ReturnStatement) {
    return new ReturnStatement(variant, options);
  }
  if (variant instanceof ast.ThrowStatement) {
    return new ThrowStatement(variant);
  }
  if (variant instanceof ast.EmitStatement) {
    return new EmitStatement(variant, options);
  }
  if (variant instanceof ast.TryStatement) {
    return new TryStatement(variant, options);
  }
  if (variant instanceof ast.RevertStatement) {
    return new RevertStatement(variant, options);
  }
  if (variant instanceof ast.AssemblyStatement) {
    return new AssemblyStatement(variant, options);
  }
  if (variant instanceof ast.Block) {
    return new Block(variant, options);
  }
  if (variant instanceof ast.UncheckedBlock) {
    return new UncheckedBlock(variant, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
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

  constructor(ast: ast.Statement, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
