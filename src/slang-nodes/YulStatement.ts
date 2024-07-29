import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
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

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

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

  constructor(ast: ast.YulStatement, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    switch (ast.variant.cst.kind) {
      case 'YulBlock':
        this.variant = new YulBlock(
          ast.variant as ast.YulBlock,
          offsets[0],
          options
        );
        break;
      case 'YulFunctionDefinition':
        this.variant = new YulFunctionDefinition(
          ast.variant as ast.YulFunctionDefinition,
          offsets[0],
          options
        );
        break;
      case 'YulVariableDeclarationStatement':
        this.variant = new YulVariableDeclarationStatement(
          ast.variant as ast.YulVariableDeclarationStatement,
          offsets[0],
          options
        );
        break;
      case 'YulVariableAssignmentStatement':
        this.variant = new YulVariableAssignmentStatement(
          ast.variant as ast.YulVariableAssignmentStatement,
          offsets[0],
          options
        );
        break;
      case 'YulStackAssignmentStatement':
        this.variant = new YulStackAssignmentStatement(
          ast.variant as ast.YulStackAssignmentStatement,
          offsets[0],
          options
        );
        break;
      case 'YulIfStatement':
        this.variant = new YulIfStatement(
          ast.variant as ast.YulIfStatement,
          offsets[0],
          options
        );
        break;
      case 'YulForStatement':
        this.variant = new YulForStatement(
          ast.variant as ast.YulForStatement,
          offsets[0],
          options
        );
        break;
      case 'YulSwitchStatement':
        this.variant = new YulSwitchStatement(
          ast.variant as ast.YulSwitchStatement,
          offsets[0],
          options
        );
        break;
      case 'YulLeaveStatement':
        this.variant = new YulLeaveStatement(
          ast.variant as ast.YulLeaveStatement,
          offsets[0]
        );
        break;
      case 'YulBreakStatement':
        this.variant = new YulBreakStatement(
          ast.variant as ast.YulBreakStatement,
          offsets[0]
        );
        break;
      case 'YulContinueStatement':
        this.variant = new YulContinueStatement(
          ast.variant as ast.YulContinueStatement,
          offsets[0]
        );
        break;
      case 'YulLabel':
        this.variant = new YulLabel(ast.variant as ast.YulLabel, offsets[0]);
        break;
      case 'YulExpression':
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

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return path.call(print, 'variant');
  }
}
