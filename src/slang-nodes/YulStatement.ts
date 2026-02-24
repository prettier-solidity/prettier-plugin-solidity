import * as slangAst from '@nomicfoundation/slang/ast';
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

  constructor(
    ast: slangAst.YulStatement,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    const variant = ast.variant;
    if (process.env.NODE_ENV === 'test') {
      // This is to ensure that we have handled all variants of `YulStatement`
      // in the `createNonterminalVariant` function above.
      ((variant: slangAst.YulStatement['variant']): void => {
        if (variant instanceof slangAst.YulBlock) return;
        if (variant instanceof slangAst.YulFunctionDefinition) return;
        if (variant instanceof slangAst.YulVariableDeclarationStatement) return;
        if (variant instanceof slangAst.YulVariableAssignmentStatement) return;
        if (variant instanceof slangAst.YulStackAssignmentStatement) return;
        if (variant instanceof slangAst.YulIfStatement) return;
        if (variant instanceof slangAst.YulForStatement) return;
        if (variant instanceof slangAst.YulSwitchStatement) return;
        if (variant instanceof slangAst.YulLeaveStatement) return;
        if (variant instanceof slangAst.YulBreakStatement) return;
        if (variant instanceof slangAst.YulContinueStatement) return;
        if (variant instanceof slangAst.YulLabel) return;
        if (variant instanceof slangAst.YulExpression) return;
      })(variant);
    }
    this.variant =
      variant instanceof slangAst.YulBlock
        ? new YulBlock(variant, collected, options)
        : createNonterminalVariant(variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
