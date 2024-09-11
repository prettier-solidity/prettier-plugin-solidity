import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ExpressionStatement } from './ExpressionStatement.js';
import { VariableDeclarationStatement } from './VariableDeclarationStatement.js';
import { TupleDeconstructionStatement } from './TupleDeconstructionStatement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from '../slang-nodes';
import type { PrintFunction, SlangNode } from '../types';

export class ForStatementInitialization implements SlangNode {
  readonly kind = NonterminalKind.ForStatementInitialization;

  comments;

  loc;

  variant:
    | ExpressionStatement
    | VariableDeclarationStatement
    | TupleDeconstructionStatement
    | string;

  constructor(
    ast: ast.ForStatementInitialization,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    if (ast.variant instanceof TerminalNode) {
      this.variant = ast.variant.text;
    } else {
      switch (ast.variant.cst.kind) {
        case NonterminalKind.ExpressionStatement:
          this.variant = new ExpressionStatement(
            ast.variant as ast.ExpressionStatement,
            offsets[0],
            options
          );
          break;
        case NonterminalKind.VariableDeclarationStatement:
          this.variant = new VariableDeclarationStatement(
            ast.variant as ast.VariableDeclarationStatement,
            offsets[0],
            options
          );
          break;
        case NonterminalKind.TupleDeconstructionStatement:
          this.variant = new TupleDeconstructionStatement(
            ast.variant as ast.TupleDeconstructionStatement,
            offsets[0],
            options
          );
          break;
        default:
          throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
      }
    }

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ForStatementInitialization>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}