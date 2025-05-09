import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';
import { Expression } from './Expression.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { Block } from './Block.js';
import { CatchClauses } from './CatchClauses.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { line } = doc.builders;

export class TryStatement implements SlangNode {
  readonly kind = NonterminalKind.TryStatement;

  comments;

  loc;

  expression: Expression;

  returns?: ReturnsDeclaration;

  body: Block;

  catchClauses: CatchClauses;

  constructor(ast: ast.TryStatement) {
    let metadata = getNodeMetadata(ast);

    this.expression = new Expression(ast.expression);
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns);
    }
    this.body = new Block(ast.body);
    this.catchClauses = new CatchClauses(ast.catchClauses);

    metadata = updateMetadata(metadata, [
      this.expression,
      this.returns,
      this.body,
      this.catchClauses
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
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
