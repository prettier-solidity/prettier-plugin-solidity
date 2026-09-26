import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { Expression } from './Expression.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class ReturnStatement extends SlangNode {
  readonly kind = NonterminalKind.ReturnStatement;

  expression?: Expression['variant'];

  constructor(ast: ast.ReturnStatement, collected: CollectedMetadata) {
    super(ast, collected);

    if (ast.expression) {
      this.expression = extractVariant(
        new Expression(ast.expression, collected)
      );
    }

    this.updateMetadata(this.expression);
  }

  print(
    print: PrintFunction,
    _path: AstPath<ReturnStatement>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    const expressionVariantKind = this.expression?.kind;
    return [
      'return',
      expressionVariantKind
        ? printIndentedGroupOrSpacedDocument(
            print('expression'),
            expressionVariantKind !== NonterminalKind.TupleExpression &&
              (!options.experimentalTernaries ||
                expressionVariantKind !== NonterminalKind.ConditionalExpression)
          )
        : '',
      ';'
    ];
  }
}
