import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
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

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class Statement implements SlangNode {
  readonly kind = NonterminalKind.Statement;

  comments;

  loc;

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
    let metadata = getNodeMetadata(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.ExpressionStatement:
        this.variant = new ExpressionStatement(
          ast.variant as ast.ExpressionStatement,
          options
        );
        break;
      case NonterminalKind.VariableDeclarationStatement:
        this.variant = new VariableDeclarationStatement(
          ast.variant as ast.VariableDeclarationStatement,
          options
        );
        break;
      case NonterminalKind.TupleDeconstructionStatement:
        this.variant = new TupleDeconstructionStatement(
          ast.variant as ast.TupleDeconstructionStatement,
          options
        );
        break;
      case NonterminalKind.IfStatement:
        this.variant = new IfStatement(ast.variant as ast.IfStatement, options);
        break;
      case NonterminalKind.ForStatement:
        this.variant = new ForStatement(
          ast.variant as ast.ForStatement,
          options
        );
        break;
      case NonterminalKind.WhileStatement:
        this.variant = new WhileStatement(
          ast.variant as ast.WhileStatement,
          options
        );
        break;
      case NonterminalKind.DoWhileStatement:
        this.variant = new DoWhileStatement(
          ast.variant as ast.DoWhileStatement,
          options
        );
        break;
      case NonterminalKind.ContinueStatement:
        this.variant = new ContinueStatement(
          ast.variant as ast.ContinueStatement
        );
        break;
      case NonterminalKind.BreakStatement:
        this.variant = new BreakStatement(ast.variant as ast.BreakStatement);
        break;
      case NonterminalKind.ReturnStatement:
        this.variant = new ReturnStatement(
          ast.variant as ast.ReturnStatement,
          options
        );
        break;
      case NonterminalKind.ThrowStatement:
        this.variant = new ThrowStatement(ast.variant as ast.ThrowStatement);
        break;
      case NonterminalKind.EmitStatement:
        this.variant = new EmitStatement(
          ast.variant as ast.EmitStatement,
          options
        );
        break;
      case NonterminalKind.TryStatement:
        this.variant = new TryStatement(
          ast.variant as ast.TryStatement,
          options
        );
        break;
      case NonterminalKind.RevertStatement:
        this.variant = new RevertStatement(
          ast.variant as ast.RevertStatement,
          options
        );
        break;
      case NonterminalKind.AssemblyStatement:
        this.variant = new AssemblyStatement(
          ast.variant as ast.AssemblyStatement,
          options
        );
        break;
      case NonterminalKind.Block:
        this.variant = new Block(ast.variant as ast.Block, options);
        break;
      case NonterminalKind.UncheckedBlock:
        this.variant = new UncheckedBlock(
          ast.variant as ast.UncheckedBlock,
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<Statement>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
