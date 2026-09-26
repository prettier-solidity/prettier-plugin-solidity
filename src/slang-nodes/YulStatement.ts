import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.ts';
import { SlangNode } from './SlangNode.ts';
import { YulBlock } from './YulBlock.ts';
import { YulFunctionDefinition } from './YulFunctionDefinition.ts';
import { YulVariableDeclarationStatement } from './YulVariableDeclarationStatement.ts';
import { YulVariableAssignmentStatement } from './YulVariableAssignmentStatement.ts';
import { YulStackAssignmentStatement } from './YulStackAssignmentStatement.ts';
import { YulIfStatement } from './YulIfStatement.ts';
import { YulForStatement } from './YulForStatement.ts';
import { YulSwitchStatement } from './YulSwitchStatement.ts';
import { YulLeaveStatement } from './YulLeaveStatement.ts';
import { YulBreakStatement } from './YulBreakStatement.ts';
import { YulContinueStatement } from './YulContinueStatement.ts';
import { YulLabel } from './YulLabel.ts';
import { YulExpression } from './YulExpression.ts';

import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  slangAst.YulStatement,
  YulStatement
>(
  [
    [slangAst.YulFunctionDefinition, YulFunctionDefinition],
    [slangAst.YulVariableDeclarationStatement, YulVariableDeclarationStatement],
    [slangAst.YulVariableAssignmentStatement, YulVariableAssignmentStatement],
    [slangAst.YulStackAssignmentStatement, YulStackAssignmentStatement],
    [slangAst.YulIfStatement, YulIfStatement],
    [slangAst.YulForStatement, YulForStatement],
    [slangAst.YulSwitchStatement, YulSwitchStatement],
    [slangAst.YulLeaveStatement, YulLeaveStatement],
    [slangAst.YulBreakStatement, YulBreakStatement],
    [slangAst.YulContinueStatement, YulContinueStatement],
    [slangAst.YulLabel, YulLabel]
  ],
  [[slangAst.YulExpression, YulExpression]]
);

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

  constructor(ast: slangAst.YulStatement, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    this.variant =
      variant instanceof slangAst.YulBlock
        ? new YulBlock(variant, collected)
        : createNonterminalVariant(variant, collected);

    this.updateMetadata(this.variant);
  }
}
