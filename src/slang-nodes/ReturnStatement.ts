import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.js';
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
        ? printIndentedGroupOrSpacedDocument(
            path.call(print, 'expression'),
            expressionVariantKind !== NonterminalKind.TupleExpression &&
              (!options.experimentalTernaries ||
                expressionVariantKind !== NonterminalKind.ConditionalExpression)
          )
        : '',
      ';'
    ];
  }
}
