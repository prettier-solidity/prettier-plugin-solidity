import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { ForStatementInitialization } from './ForStatementInitialization.js';
import { ForStatementCondition } from './ForStatementCondition.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { group, indent, line } = doc.builders;

export class ForStatement implements SlangNode {
  readonly kind = NonterminalKind.ForStatement;

  comments;

  loc;

  initialization: ForStatementInitialization;

  condition: ForStatementCondition;

  iterator?: Expression;

  body: Statement;

  constructor(ast: ast.ForStatement, options: ParserOptions<AstNode>) {
    let metadata = getNodeMetadata(ast);

    this.initialization = new ForStatementInitialization(
      ast.initialization,
      options
    );
    this.condition = new ForStatementCondition(ast.condition, options);
    if (ast.iterator) {
      this.iterator = new Expression(ast.iterator, options);
    }
    this.body = new Statement(ast.body, options);

    metadata = updateMetadata(metadata, [
      this.initialization,
      this.condition,
      this.iterator,
      this.body
    ]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<ForStatement>, print: PrintFunction): Doc {
    const initialization = path.call(print, 'initialization');
    const condition = path.call(print, 'condition');
    const iterator = path.call(print, 'iterator');

    return [
      'for (',
      printSeparatedList([initialization, condition, iterator], {
        separator:
          initialization !== ';' || condition !== ';' || iterator !== ''
            ? line
            : ''
      }),
      ')',
      this.body.variant.kind === NonterminalKind.Block
        ? [' ', path.call(print, 'body')]
        : group(indent([line, path.call(print, 'body')]))
    ];
  }
}
