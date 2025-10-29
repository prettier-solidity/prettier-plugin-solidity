import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { Block } from './Block.js';
import { CatchClauses } from './CatchClauses.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

const { line } = doc.builders;

export class TryStatement extends SlangNode {
  readonly kind = NonterminalKind.TryStatement;

  expression: Expression['variant'];

  returns?: ReturnsDeclaration;

  body: Block;

  catchClauses: CatchClauses;

  constructor(ast: ast.TryStatement, options: ParserOptions<AstNode>) {
    super(ast);

    this.expression = extractVariant(new Expression(ast.expression, options));
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, options);
    }
    this.body = new Block(ast.body, options);
    this.catchClauses = new CatchClauses(ast.catchClauses, options);

    this.updateMetadata(
      this.expression,
      this.returns,
      this.body,
      this.catchClauses
    );
  }

  print(path: AstPath<TryStatement>, print: PrintFunction): Doc {
    return [
      'try',
      printSeparatedItem(path.call(print, 'expression'), {
        firstSeparator: line
      }),
      joinExisting(' ', [
        path.call(print, 'returns'),
        path.call(print, 'body'),
        path.call(print, 'catchClauses')
      ])
    ];
  }
}
