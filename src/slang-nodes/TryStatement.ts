import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/get-offsets.js';
import { Expression } from './Expression.js';
import { ReturnsDeclaration } from './ReturnsDeclaration.js';
import { Block } from './Block.js';
import { CatchClauses } from './CatchClauses.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { SlangNode } from '../types.js';

const { line } = doc.builders;

export class TryStatement implements SlangNode {
  readonly kind = NonterminalKind.TryStatement;

  comments;

  loc;

  tryKeyword;

  expression: Expression;

  returns?: ReturnsDeclaration;

  body: Block;

  catchClauses: CatchClauses;

  constructor(ast: ast.TryStatement, offset: number, options: ParserOptions) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.tryKeyword = ast.tryKeyword.text;
    this.expression = new Expression(ast.expression, offsets[0], options);
    let i = 1;
    if (ast.returns) {
      this.returns = new ReturnsDeclaration(ast.returns, offsets[i], options);
      i += 1;
    }
    this.body = new Block(ast.body, offsets[i], options);
    i += 1;
    this.catchClauses = new CatchClauses(ast.catchClauses, offsets[i], options);

    metadata = updateMetadata(metadata, [
      this.expression,
      this.returns,
      this.body,
      this.catchClauses
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath, print: (path: AstPath) => Doc): Doc {
    return [
      this.tryKeyword,
      printSeparatedItem(path.call(print, 'expression'), {
        firstSeparator: line
      }),
      this.returns ? [path.call(print, 'returns'), ' '] : '',
      path.call(print, 'body'),
      ' ',
      path.call(print, 'catchClauses')
    ];
  }
}
