import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
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
import type { PrintFunction } from '../types.d.ts';

export class YulStatement extends SlangNode {
  readonly kind = NonterminalKind.YulStatement;

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
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.YulBlock:
        this.variant = new YulBlock(variant as ast.YulBlock, options);
        break;
      case NonterminalKind.YulFunctionDefinition:
        this.variant = new YulFunctionDefinition(
          variant as ast.YulFunctionDefinition,
          options
        );
        break;
      case NonterminalKind.YulVariableDeclarationStatement:
        this.variant = new YulVariableDeclarationStatement(
          variant as ast.YulVariableDeclarationStatement,
          options
        );
        break;
      case NonterminalKind.YulVariableAssignmentStatement:
        this.variant = new YulVariableAssignmentStatement(
          variant as ast.YulVariableAssignmentStatement,
          options
        );
        break;
      case NonterminalKind.YulStackAssignmentStatement:
        this.variant = new YulStackAssignmentStatement(
          variant as ast.YulStackAssignmentStatement
        );
        break;
      case NonterminalKind.YulIfStatement:
        this.variant = new YulIfStatement(
          variant as ast.YulIfStatement,
          options
        );
        break;
      case NonterminalKind.YulForStatement:
        this.variant = new YulForStatement(
          variant as ast.YulForStatement,
          options
        );
        break;
      case NonterminalKind.YulSwitchStatement:
        this.variant = new YulSwitchStatement(
          variant as ast.YulSwitchStatement,
          options
        );
        break;
      case NonterminalKind.YulLeaveStatement:
        this.variant = new YulLeaveStatement(variant as ast.YulLeaveStatement);
        break;
      case NonterminalKind.YulBreakStatement:
        this.variant = new YulBreakStatement(variant as ast.YulBreakStatement);
        break;
      case NonterminalKind.YulContinueStatement:
        this.variant = new YulContinueStatement(
          variant as ast.YulContinueStatement
        );
        break;
      case NonterminalKind.YulLabel:
        this.variant = new YulLabel(variant as ast.YulLabel);
        break;
      case NonterminalKind.YulExpression:
        this.variant = new YulExpression(variant as ast.YulExpression, options);
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<YulStatement>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
