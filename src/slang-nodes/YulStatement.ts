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

const variantConstructors = {
  [ast.YulFunctionDefinition.name]: YulFunctionDefinition,
  [ast.YulVariableDeclarationStatement.name]: YulVariableDeclarationStatement,
  [ast.YulVariableAssignmentStatement.name]: YulVariableAssignmentStatement,
  [ast.YulStackAssignmentStatement.name]: YulStackAssignmentStatement,
  [ast.YulIfStatement.name]: YulIfStatement,
  [ast.YulForStatement.name]: YulForStatement,
  [ast.YulSwitchStatement.name]: YulSwitchStatement,
  [ast.YulLeaveStatement.name]: YulLeaveStatement,
  [ast.YulBreakStatement.name]: YulBreakStatement,
  [ast.YulContinueStatement.name]: YulContinueStatement,
  [ast.YulLabel.name]: YulLabel
};

const variantWithVariantsConstructors = {
  [ast.YulExpression.name]: YulExpression
};

function createNonterminalVariant(
  variant: ast.YulStatement['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): YulStatement['variant'] {
  if (variant instanceof ast.YulBlock) {
    return new YulBlock(variant, collected, options);
  }

  const variantConstructor = variantConstructors[variant.constructor.name];
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected, options);

  const variantWithVariantsConstructor =
    variantWithVariantsConstructors[variant.constructor.name];
  if (variantWithVariantsConstructor !== undefined)
    return extractVariant(
      new variantWithVariantsConstructor(variant as never, collected, options)
    );

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
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
