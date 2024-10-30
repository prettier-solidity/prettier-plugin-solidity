import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulBlock } from './YulBlock.js';
import { YulFunctionDefinition } from './YulFunctionDefinition.js';
import { YulVariableDeclarationStatement } from './YulVariableDeclarationStatement.js';
import { YulVariableAssignmentStatement } from './YulVariableAssignmentStatement.js';
import { YulStackAssignmentStatement } from './YulStackAssignmentStatement.js';
import { YulIfStatement } from './YulIfStatement.js';
import { YulForStatement } from './YulForStatement.js';
import { YulSwitchStatement } from './YulSwitchStatement.js';
import { YulLeaveStatement } from './YulLeaveStatement.js';
import { YulBreakStatement } from './YulBreakStatement.js';
import { YulContinueStatement } from './YulContinueStatement.js';
import { YulLabel } from './YulLabel.js';
import { YulExpression } from './YulExpression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulStatement implements SlangNode {
  readonly kind = NonterminalKind.YulStatement;

  comments;

  loc;

  variant:
    | YulBlock
    | YulFunctionDefinition
    | YulVariableDeclarationStatement
    | YulVariableAssignmentStatement
    | YulStackAssignmentStatement
    | YulIfStatement
    | YulForStatement
    | YulSwitchStatement
    | YulLeaveStatement
    | YulBreakStatement
    | YulContinueStatement
    | YulLabel
    | YulExpression;

  constructor(
    ast: ast.YulStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case NonterminalKind.YulBlock:
        this.variant = new YulBlock(
          ast.variant as ast.YulBlock,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.YulFunctionDefinition:
        this.variant = new YulFunctionDefinition(
          ast.variant as ast.YulFunctionDefinition,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.YulVariableDeclarationStatement:
        this.variant = new YulVariableDeclarationStatement(
          ast.variant as ast.YulVariableDeclarationStatement,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.YulVariableAssignmentStatement:
        this.variant = new YulVariableAssignmentStatement(
          ast.variant as ast.YulVariableAssignmentStatement,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.YulStackAssignmentStatement:
        this.variant = new YulStackAssignmentStatement(
          ast.variant as ast.YulStackAssignmentStatement,
          offsets[0]
        );
        break;
      case NonterminalKind.YulIfStatement:
        this.variant = new YulIfStatement(
          ast.variant as ast.YulIfStatement,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.YulForStatement:
        this.variant = new YulForStatement(
          ast.variant as ast.YulForStatement,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.YulSwitchStatement:
        this.variant = new YulSwitchStatement(
          ast.variant as ast.YulSwitchStatement,
          offsets[0],
          options
        );
        break;
      case NonterminalKind.YulLeaveStatement:
        this.variant = new YulLeaveStatement(
          ast.variant as ast.YulLeaveStatement,
          offsets[0]
        );
        break;
      case NonterminalKind.YulBreakStatement:
        this.variant = new YulBreakStatement(
          ast.variant as ast.YulBreakStatement,
          offsets[0]
        );
        break;
      case NonterminalKind.YulContinueStatement:
        this.variant = new YulContinueStatement(
          ast.variant as ast.YulContinueStatement,
          offsets[0]
        );
        break;
      case NonterminalKind.YulLabel:
        this.variant = new YulLabel(ast.variant as ast.YulLabel, offsets[0]);
        break;
      case NonterminalKind.YulExpression:
        this.variant = new YulExpression(
          ast.variant as ast.YulExpression,
          offsets[0],
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

  print(path: AstPath<YulStatement>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
