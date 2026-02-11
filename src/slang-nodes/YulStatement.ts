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

const keys = [
  ast.YulFunctionDefinition,
  ast.YulVariableDeclarationStatement,
  ast.YulVariableAssignmentStatement,
  ast.YulStackAssignmentStatement,
  ast.YulIfStatement,
  ast.YulForStatement,
  ast.YulSwitchStatement,
  ast.YulLeaveStatement,
  ast.YulBreakStatement,
  ast.YulContinueStatement,
  ast.YulLabel
];
const constructors = [
  YulFunctionDefinition,
  YulVariableDeclarationStatement,
  YulVariableAssignmentStatement,
  YulStackAssignmentStatement,
  YulIfStatement,
  YulForStatement,
  YulSwitchStatement,
  YulLeaveStatement,
  YulBreakStatement,
  YulContinueStatement,
  YulLabel
];

const variantConstructors = new Map<string, (typeof constructors)[number]>(
  keys.map((key, index) => [key.name, constructors[index]])
);

const keysWithVariants = [ast.YulExpression];
const constructorsWithVariants = [YulExpression];

const variantWithVariantsConstructors = new Map<
  string,
  (typeof constructorsWithVariants)[number]
>(
  keysWithVariants.map((key, index) => [
    key.name,
    constructorsWithVariants[index]
  ])
);

function createNonterminalVariant(
  variant: ast.YulStatement['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): YulStatement['variant'] {
  if (variant instanceof ast.YulBlock) {
    return new YulBlock(variant, collected, options);
  }

  const variantConstructor = variantConstructors.get(variant.constructor.name);
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected, options);

  const variantWithVariantsConstructor = variantWithVariantsConstructors.get(
    variant.constructor.name
  );
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
