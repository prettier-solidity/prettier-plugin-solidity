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

const variantConstructors = {
  [ast.ExpressionStatement.name]: ExpressionStatement,
  [ast.VariableDeclarationStatement.name]: VariableDeclarationStatement,
  [ast.TupleDeconstructionStatement.name]: TupleDeconstructionStatement,
  [ast.IfStatement.name]: IfStatement,
  [ast.ForStatement.name]: ForStatement,
  [ast.WhileStatement.name]: WhileStatement,
  [ast.DoWhileStatement.name]: DoWhileStatement,
  [ast.ContinueStatement.name]: ContinueStatement,
  [ast.BreakStatement.name]: BreakStatement,
  [ast.ReturnStatement.name]: ReturnStatement,
  [ast.ThrowStatement.name]: ThrowStatement,
  [ast.EmitStatement.name]: EmitStatement,
  [ast.TryStatement.name]: TryStatement,
  [ast.RevertStatement.name]: RevertStatement,
  [ast.AssemblyStatement.name]: AssemblyStatement,
  [ast.UncheckedBlock.name]: UncheckedBlock
} as const;

function createNonterminalVariant(
  variant: ast.Statement['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): Statement['variant'] {
  if (variant instanceof ast.Block) {
    return new Block(variant, collected, options);
  }

  const variantConstructor = variantConstructors[variant.constructor.name];
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
