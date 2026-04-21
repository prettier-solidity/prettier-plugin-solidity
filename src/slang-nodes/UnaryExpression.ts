import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type { Doc } from 'prettier';
import type {
  CollectedMetadata,
  PrintFunction,
  SlangUnaryOperation
} from '../types.d.ts';

export abstract class UnaryExpression extends SlangNode {
  operand: Expression['variant'];

  operator: string;

  protected constructor(
    ast: SlangUnaryOperation,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    this.operand = extractVariant(new Expression(ast.operand, collected));
    this.operator = ast.operator.unparse();

    this.updateMetadata(this.operand);
  }

  abstract print(print: PrintFunction): Doc;
}
