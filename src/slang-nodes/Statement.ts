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

function createNonterminalVariant(
  variant: ast.Statement['variant'],
  options: ParserOptions<AstNode>
): Statement['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.ExpressionStatement:
      return new ExpressionStatement(
        variant as ast.ExpressionStatement,
        options
      );
    case NonterminalKind.VariableDeclarationStatement:
      return new VariableDeclarationStatement(
        variant as ast.VariableDeclarationStatement,
        options
      );
    case NonterminalKind.TupleDeconstructionStatement:
      return new TupleDeconstructionStatement(
        variant as ast.TupleDeconstructionStatement,
        options
      );
    case NonterminalKind.IfStatement:
      return new IfStatement(variant as ast.IfStatement, options);
    case NonterminalKind.ForStatement:
      return new ForStatement(variant as ast.ForStatement, options);
    case NonterminalKind.WhileStatement:
      return new WhileStatement(variant as ast.WhileStatement, options);
    case NonterminalKind.DoWhileStatement:
      return new DoWhileStatement(variant as ast.DoWhileStatement, options);
    case NonterminalKind.ContinueStatement:
      return new ContinueStatement(variant as ast.ContinueStatement);
    case NonterminalKind.BreakStatement:
      return new BreakStatement(variant as ast.BreakStatement);
    case NonterminalKind.ReturnStatement:
      return new ReturnStatement(variant as ast.ReturnStatement, options);
    case NonterminalKind.ThrowStatement:
      return new ThrowStatement(variant as ast.ThrowStatement);
    case NonterminalKind.EmitStatement:
      return new EmitStatement(variant as ast.EmitStatement, options);
    case NonterminalKind.TryStatement:
      return new TryStatement(variant as ast.TryStatement, options);
    case NonterminalKind.RevertStatement:
      return new RevertStatement(variant as ast.RevertStatement, options);
    case NonterminalKind.AssemblyStatement:
      return new AssemblyStatement(variant as ast.AssemblyStatement, options);
    case NonterminalKind.Block:
      return new Block(variant as ast.Block, options);
    case NonterminalKind.UncheckedBlock:
      return new UncheckedBlock(variant as ast.UncheckedBlock, options);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
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

  print(path: AstPath<Statement>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
