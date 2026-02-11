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
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const keys = [
  ast.ExpressionStatement,
  ast.VariableDeclarationStatement,
  ast.TupleDeconstructionStatement,
  ast.IfStatement,
  ast.ForStatement,
  ast.WhileStatement,
  ast.DoWhileStatement,
  ast.ContinueStatement,
  ast.BreakStatement,
  ast.ReturnStatement,
  ast.ThrowStatement,
  ast.EmitStatement,
  ast.TryStatement,
  ast.RevertStatement,
  ast.AssemblyStatement,
  ast.UncheckedBlock
];
const constructors = [
  ExpressionStatement,
  VariableDeclarationStatement,
  TupleDeconstructionStatement,
  IfStatement,
  ForStatement,
  WhileStatement,
  DoWhileStatement,
  ContinueStatement,
  BreakStatement,
  ReturnStatement,
  ThrowStatement,
  EmitStatement,
  TryStatement,
  RevertStatement,
  AssemblyStatement,
  UncheckedBlock
];

const variantConstructors = new Map<string, (typeof constructors)[number]>(
  keys.map((key, index) => [key.name, constructors[index]])
);

function createNonterminalVariant(
  variant: ast.Statement['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): Statement['variant'] {
  if (variant instanceof ast.Block) {
    return new Block(variant, collected, options);
  }

  const variantConstructor = variantConstructors.get(variant.constructor.name);
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected, options);

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
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
