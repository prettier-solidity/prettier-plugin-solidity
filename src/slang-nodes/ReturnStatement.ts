import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSpacedOrIndentedGroup } from '../slang-printers/print-spaced-or-indented-group.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

export class ReturnStatement extends SlangNode {
  readonly kind = NonterminalKind.ReturnStatement;

  expression?: Expression;

  constructor(ast: ast.ReturnStatement, options: ParserOptions<AstNode>) {
    super(ast);

    if (ast.expression) {
      this.expression = new Expression(ast.expression, options);
    }

    this.updateMetadata(this.expression);
  }

  print(
    path: AstPath<ReturnStatement>,
    print: PrintFunction,
    options: ParserOptions<AstNode>
  ): Doc {
    const expressionVariantKind = this.expression?.variant.kind;
    return [
      'return',
      expressionVariantKind
        ? printSpacedOrIndentedGroup(
            path.call(print, 'expression'),
            expressionVariantKind === NonterminalKind.TupleExpression ||
              (options.experimentalTernaries &&
                expressionVariantKind === NonterminalKind.ConditionalExpression)
          )
        : '',
      ';'
    ];
  }
}
