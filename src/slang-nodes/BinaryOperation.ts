import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type { AstPath, Doc, ParserOptions } from 'prettier';
import type {
  CollectedMetadata,
  PrintFunction,
  SlangBinaryOperation
} from '../types.d.ts';
import type {
  BinaryOperation as BinaryOperationType,
  PrintableNode
} from './types.d.ts';

export abstract class BinaryOperation extends SlangNode {
  readonly #printFunction: (
    node: BinaryOperationType,
    print: PrintFunction,
    path: AstPath<PrintableNode>,
    options: ParserOptions<PrintableNode>
  ) => Doc;

  leftOperand: Expression['variant'];

  operator: string;

  rightOperand: Expression['variant'];

  protected constructor(
    ast: SlangBinaryOperation,
    collected: CollectedMetadata,
    printFunction: (
      node: BinaryOperationType,
      print: PrintFunction,
      path: AstPath<PrintableNode>,
      options: ParserOptions<PrintableNode>
    ) => Doc
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

    this.#printFunction = printFunction;
  }

  print(
    print: PrintFunction,
    path: AstPath<PrintableNode>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return this.#printFunction(
      this as BinaryOperationType,
      print,
      path,
      options
    );
  }
}
