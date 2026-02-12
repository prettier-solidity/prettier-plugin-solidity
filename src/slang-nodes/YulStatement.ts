import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
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

const createNonterminalVariantInternal = createNonterminalVariantCreator<
  ast.YulStatement,
  YulStatement
>(
  [
    [ast.YulFunctionDefinition, YulFunctionDefinition],
    [ast.YulVariableDeclarationStatement, YulVariableDeclarationStatement],
    [ast.YulVariableAssignmentStatement, YulVariableAssignmentStatement],
    [ast.YulStackAssignmentStatement, YulStackAssignmentStatement],
    [ast.YulIfStatement, YulIfStatement],
    [ast.YulForStatement, YulForStatement],
    [ast.YulSwitchStatement, YulSwitchStatement],
    [ast.YulLeaveStatement, YulLeaveStatement],
    [ast.YulBreakStatement, YulBreakStatement],
    [ast.YulContinueStatement, YulContinueStatement],
    [ast.YulLabel, YulLabel]
  ],
  [[ast.YulExpression, YulExpression]]
);

function createNonterminalVariant(
  variant: ast.YulStatement['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): YulStatement['variant'] {
  if (variant instanceof ast.YulBlock) {
    return new YulBlock(variant, collected, options);
  }
  return createNonterminalVariantInternal(variant, collected, options);
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
