import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { printPossibleMemberAccessChainItem } from '../slang-printers/print-member-access-chain-item.ts';
import { SlangNode } from './SlangNode.ts';
import { Expression } from './Expression.ts';
import { ArgumentsDeclaration } from './ArgumentsDeclaration.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class FunctionCallExpression extends SlangNode {
  readonly kind = NonterminalKind.FunctionCallExpression;

  operand: Expression['variant'];

  arguments: ArgumentsDeclaration['variant'];

  constructor(ast: ast.FunctionCallExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.operand = extractVariant(new Expression(ast.operand, collected));
    this.arguments = extractVariant(
      new ArgumentsDeclaration(ast.arguments, collected)
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
