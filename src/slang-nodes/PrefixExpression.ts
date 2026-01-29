import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class PrefixExpression extends SlangNode {
  readonly kind = NonterminalKind.PrefixExpression;

  operator: string;

  operand: Expression['variant'];

  constructor(
    ast: ast.PrefixExpression,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.operator = ast.operator.unparse();
    this.operand = extractVariant(
      new Expression(ast.operand, collected, options)
    );

    this.updateMetadata(this.operand);

    if (this.operator === 'delete') {
      this.operator = `${this.operator} `;
    }
  }

  print(path: AstPath<PrefixExpression>, print: PrintFunction): Doc {
    return [this.operator, path.call(print, 'operand')];
  }
}
