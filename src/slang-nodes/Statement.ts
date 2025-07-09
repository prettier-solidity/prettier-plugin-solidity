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

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

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

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.ExpressionStatement:
        this.variant = new ExpressionStatement(
          variant as ast.ExpressionStatement,
          options
        );
        break;
      case NonterminalKind.VariableDeclarationStatement:
        this.variant = new VariableDeclarationStatement(
          variant as ast.VariableDeclarationStatement,
          options
        );
        break;
      case NonterminalKind.TupleDeconstructionStatement:
        this.variant = new TupleDeconstructionStatement(
          variant as ast.TupleDeconstructionStatement,
          options
        );
        break;
      case NonterminalKind.IfStatement:
        this.variant = new IfStatement(variant as ast.IfStatement, options);
        break;
      case NonterminalKind.ForStatement:
        this.variant = new ForStatement(variant as ast.ForStatement, options);
        break;
      case NonterminalKind.WhileStatement:
        this.variant = new WhileStatement(
          variant as ast.WhileStatement,
          options
        );
        break;
      case NonterminalKind.DoWhileStatement:
        this.variant = new DoWhileStatement(
          variant as ast.DoWhileStatement,
          options
        );
        break;
      case NonterminalKind.ContinueStatement:
        this.variant = new ContinueStatement(variant as ast.ContinueStatement);
        break;
      case NonterminalKind.BreakStatement:
        this.variant = new BreakStatement(variant as ast.BreakStatement);
        break;
      case NonterminalKind.ReturnStatement:
        this.variant = new ReturnStatement(
          variant as ast.ReturnStatement,
          options
        );
        break;
      case NonterminalKind.ThrowStatement:
        this.variant = new ThrowStatement(variant as ast.ThrowStatement);
        break;
      case NonterminalKind.EmitStatement:
        this.variant = new EmitStatement(variant as ast.EmitStatement, options);
        break;
      case NonterminalKind.TryStatement:
        this.variant = new TryStatement(variant as ast.TryStatement, options);
        break;
      case NonterminalKind.RevertStatement:
        this.variant = new RevertStatement(
          variant as ast.RevertStatement,
          options
        );
        break;
      case NonterminalKind.AssemblyStatement:
        this.variant = new AssemblyStatement(
          variant as ast.AssemblyStatement,
          options
        );
        break;
      case NonterminalKind.Block:
        this.variant = new Block(variant as ast.Block, options);
        break;
      case NonterminalKind.UncheckedBlock:
        this.variant = new UncheckedBlock(
          variant as ast.UncheckedBlock,
          options
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<Statement>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
