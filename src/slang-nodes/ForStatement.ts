import { doc } from 'prettier';
import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ForStatementInitialization } from './ForStatementInitialization.js';
import { ForStatementCondition } from './ForStatementCondition.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

const { group, indent, line } = doc.builders;

export class ForStatement implements SlangNode {
  readonly kind = NonterminalKind.ForStatement;

  comments;

  loc;

  forKeyword: string;

  openParen: string;

  initialization: ForStatementInitialization;

  condition: ForStatementCondition;

  iterator?: Expression;

  closeParen: string;

  body: Statement;

  constructor(
    ast: ast.ForStatement,
    offset: number,
    options: ParserOptions<AstNode>
  ) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.forKeyword = ast.forKeyword.text;
    this.openParen = ast.openParen.text;
    this.initialization = new ForStatementInitialization(
      ast.initialization,
      offsets[0],
      options
    );
    this.condition = new ForStatementCondition(
      ast.condition,
      offsets[1],
      options
    );
    let i = 2;
    if (ast.iterator) {
      this.iterator = new Expression(ast.iterator, offsets[i], options);
      i += 1;
    }
    this.closeParen = ast.closeParen.text;
    this.body = new Statement(ast.body, offsets[i], options);

    metadata = updateMetadata(metadata, [
      this.initialization,
      this.condition,
      this.iterator,
      this.body
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<ForStatement>,
    print: (path: AstPath<AstNode | undefined>) => Doc
  ): Doc {
    const initialization = path.call(print, 'initialization');
    const condition = path.call(print, 'condition');
    const iterator = this.iterator ? path.call(print, 'iterator') : '';

    return [
      `${this.forKeyword} ${this.openParen}`,
      printSeparatedList([initialization, condition, iterator], {
        separator:
          initialization !== ';' || condition !== ';' || iterator !== ''
            ? line
            : ''
      }),
      this.closeParen,
      this.body.variant.kind === NonterminalKind.Block
        ? [' ', path.call(print, 'body')]
        : group(indent([line, path.call(print, 'body')]))
    ];
  }
}
