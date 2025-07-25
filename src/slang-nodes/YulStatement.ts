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

function createNonterminalVariant(
  variant: ast.YulStatement['variant'],
  options: ParserOptions<AstNode>
): YulStatement['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.YulBlock:
      return new YulBlock(variant as ast.YulBlock, options);
    case NonterminalKind.YulFunctionDefinition:
      return new YulFunctionDefinition(
        variant as ast.YulFunctionDefinition,
        options
      );
    case NonterminalKind.YulVariableDeclarationStatement:
      return new YulVariableDeclarationStatement(
        variant as ast.YulVariableDeclarationStatement,
        options
      );
    case NonterminalKind.YulVariableAssignmentStatement:
      return new YulVariableAssignmentStatement(
        variant as ast.YulVariableAssignmentStatement,
        options
      );
    case NonterminalKind.YulStackAssignmentStatement:
      return new YulStackAssignmentStatement(
        variant as ast.YulStackAssignmentStatement
      );
    case NonterminalKind.YulIfStatement:
      return new YulIfStatement(variant as ast.YulIfStatement, options);
    case NonterminalKind.YulForStatement:
      return new YulForStatement(variant as ast.YulForStatement, options);
    case NonterminalKind.YulSwitchStatement:
      return new YulSwitchStatement(variant as ast.YulSwitchStatement, options);
    case NonterminalKind.YulLeaveStatement:
      return new YulLeaveStatement(variant as ast.YulLeaveStatement);
    case NonterminalKind.YulBreakStatement:
      return new YulBreakStatement(variant as ast.YulBreakStatement);
    case NonterminalKind.YulContinueStatement:
      return new YulContinueStatement(variant as ast.YulContinueStatement);
    case NonterminalKind.YulLabel:
      return new YulLabel(variant as ast.YulLabel);
    case NonterminalKind.YulExpression:
      return new YulExpression(variant as ast.YulExpression, options);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

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

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<YulStatement>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
