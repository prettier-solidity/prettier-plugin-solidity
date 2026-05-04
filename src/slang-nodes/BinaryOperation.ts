import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type { HugFunction } from '../slang-utils/types.d.ts';
import type { CollectedMetadata, SlangBinaryOperation } from '../types.d.ts';

export abstract class BinaryOperation extends SlangNode {
  leftOperand: Expression['variant'];

  operator: string;

  rightOperand: Expression['variant'];

  protected constructor(
    ast: SlangBinaryOperation,
    collected: CollectedMetadata,
    hugLeft?: HugFunction,
    hugRight?: HugFunction
  ) {
    super(ast, collected);

    this.leftOperand = extractVariant(
      new Expression(ast.leftOperand, collected)
    );
    this.operator = ast.operator.unparse();
    this.rightOperand = extractVariant(
      new Expression(ast.rightOperand, collected)
    );

    this.updateMetadata(this.leftOperand, this.rightOperand);

    if (hugLeft) {
      this.leftOperand = hugLeft(this.leftOperand);
    }
    if (hugRight) {
      this.rightOperand = hugRight(this.rightOperand);
    }
  }
}
