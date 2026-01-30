import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
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

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.YulStatement['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): YulStatement['variant'] {
  if (variant instanceof ast.YulBlock) {
    return new YulBlock(variant, collected, options);
  }
  if (variant instanceof ast.YulFunctionDefinition) {
    return new YulFunctionDefinition(variant, collected, options);
  }
  if (variant instanceof ast.YulVariableDeclarationStatement) {
    return new YulVariableDeclarationStatement(variant, collected, options);
  }
  if (variant instanceof ast.YulVariableAssignmentStatement) {
    return new YulVariableAssignmentStatement(variant, collected, options);
  }
  if (variant instanceof ast.YulStackAssignmentStatement) {
    return new YulStackAssignmentStatement(variant, collected);
  }
  if (variant instanceof ast.YulIfStatement) {
    return new YulIfStatement(variant, collected, options);
  }
  if (variant instanceof ast.YulForStatement) {
    return new YulForStatement(variant, collected, options);
  }
  if (variant instanceof ast.YulSwitchStatement) {
    return new YulSwitchStatement(variant, collected, options);
  }
  if (variant instanceof ast.YulLeaveStatement) {
    return new YulLeaveStatement(variant, collected);
  }
  if (variant instanceof ast.YulBreakStatement) {
    return new YulBreakStatement(variant, collected);
  }
  if (variant instanceof ast.YulContinueStatement) {
    return new YulContinueStatement(variant, collected);
  }
  if (variant instanceof ast.YulLabel) {
    return new YulLabel(variant, collected);
  }
  if (variant instanceof ast.YulExpression) {
    return extractVariant(new YulExpression(variant, collected, options));
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
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
    | YulExpression['variant'];

  constructor(
    ast: ast.YulStatement,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
