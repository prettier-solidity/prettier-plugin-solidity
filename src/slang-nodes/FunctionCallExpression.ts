import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { printPossibleMemberAccessChainItem } from '../slang-printers/print-member-access-chain-item.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class FunctionCallExpression extends SlangNode {
  readonly kind = NonterminalKind.FunctionCallExpression;

  operand: Expression['variant'];

  arguments: ArgumentsDeclaration['variant'];

  constructor(
    ast: ast.FunctionCallExpression,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    this.operand = extractVariant(
      new Expression(ast.operand, collected, options)
    );
    this.arguments = extractVariant(
      new ArgumentsDeclaration(ast.arguments, collected, options)
    );

    this.updateMetadata(this.operand, this.arguments);
  }

  print(print: PrintFunction): Doc {
    return printPossibleMemberAccessChainItem(
      print('operand'),
      print('arguments')
    );
  }
}
