import * as slangAst from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { createNonterminalVariantCreator } from '../slang-utils/create-nonterminal-variant-creator.js';
import { PolymorphicNode } from './PolymorphicNode.js';
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

export class YulStatement extends PolymorphicNode<
  slangAst.YulStatement,
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
  | YulExpression['variant']
> {
  readonly kind = NonterminalKind.YulStatement;

  constructor(ast: slangAst.YulStatement, collected: CollectedMetadata) {
    super(ast, collected, (variant) =>
      variant instanceof slangAst.YulBlock
        ? new YulBlock(variant, collected)
        : createNonterminalVariant(variant, collected)
    );
  }
}
