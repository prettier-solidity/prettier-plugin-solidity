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

  constructor(ast: ast.YulStatement, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.YulBlock:
        this.variant = new YulBlock(ast.variant as ast.YulBlock, options);
        break;
      case NonterminalKind.YulFunctionDefinition:
        this.variant = new YulFunctionDefinition(
          ast.variant as ast.YulFunctionDefinition,
          options
        );
        break;
      case NonterminalKind.YulVariableDeclarationStatement:
        this.variant = new YulVariableDeclarationStatement(
          ast.variant as ast.YulVariableDeclarationStatement,
          options
        );
        break;
      case NonterminalKind.YulVariableAssignmentStatement:
        this.variant = new YulVariableAssignmentStatement(
          ast.variant as ast.YulVariableAssignmentStatement,
          options
        );
        break;
      case NonterminalKind.YulStackAssignmentStatement:
        this.variant = new YulStackAssignmentStatement(
          ast.variant as ast.YulStackAssignmentStatement
        );
        break;
      case NonterminalKind.YulIfStatement:
        this.variant = new YulIfStatement(
          ast.variant as ast.YulIfStatement,
          options
        );
        break;
      case NonterminalKind.YulForStatement:
        this.variant = new YulForStatement(
          ast.variant as ast.YulForStatement,
          options
        );
        break;
      case NonterminalKind.YulSwitchStatement:
        this.variant = new YulSwitchStatement(
          ast.variant as ast.YulSwitchStatement,
          options
        );
        break;
      case NonterminalKind.YulLeaveStatement:
        this.variant = new YulLeaveStatement(
          ast.variant as ast.YulLeaveStatement
        );
        break;
      case NonterminalKind.YulBreakStatement:
        this.variant = new YulBreakStatement(
          ast.variant as ast.YulBreakStatement
        );
        break;
      case NonterminalKind.YulContinueStatement:
        this.variant = new YulContinueStatement(
          ast.variant as ast.YulContinueStatement
        );
        break;
      case NonterminalKind.YulLabel:
        this.variant = new YulLabel(ast.variant as ast.YulLabel);
        break;
      case NonterminalKind.YulExpression:
        this.variant = new YulExpression(
          ast.variant as ast.YulExpression,
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
