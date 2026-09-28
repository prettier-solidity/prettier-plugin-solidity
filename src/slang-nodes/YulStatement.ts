import { NonterminalKind, SlangAst } from '../slang-utils/slang.ts';
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

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

const createNonterminalVariant = createNonterminalVariantCreator<
  ast.YulStatement,
  YulStatement
>(
  () => [
    [SlangAst.YulFunctionDefinition, YulFunctionDefinition],
    [SlangAst.YulVariableDeclarationStatement, YulVariableDeclarationStatement],
    [SlangAst.YulVariableAssignmentStatement, YulVariableAssignmentStatement],
    [SlangAst.YulStackAssignmentStatement, YulStackAssignmentStatement],
    [SlangAst.YulIfStatement, YulIfStatement],
    [SlangAst.YulForStatement, YulForStatement],
    [SlangAst.YulSwitchStatement, YulSwitchStatement],
    [SlangAst.YulLeaveStatement, YulLeaveStatement],
    [SlangAst.YulBreakStatement, YulBreakStatement],
    [SlangAst.YulContinueStatement, YulContinueStatement],
    [SlangAst.YulLabel, YulLabel]
  ],
  () => [[SlangAst.YulExpression, YulExpression]]
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

  constructor(ast: ast.YulStatement, collected: CollectedMetadata) {
    super(ast, collected);

    const variant = ast.variant;
    this.variant =
      variant instanceof SlangAst.YulBlock
        ? new YulBlock(variant, collected)
        : createNonterminalVariant(variant, collected);

    this.updateMetadata(this.variant);
  }
}
