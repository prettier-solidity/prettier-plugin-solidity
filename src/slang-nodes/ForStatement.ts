import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.js';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { ForStatementInitialization } from './ForStatementInitialization.js';
import { ForStatementCondition } from './ForStatementCondition.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class ForStatement extends SlangNode {
  readonly kind = NonterminalKind.ForStatement;

  initialization: ForStatementInitialization;

  condition: ForStatementCondition;

  iterator?: Expression;

  body: Statement;

  constructor(ast: ast.ForStatement, options: ParserOptions<AstNode>) {
    super(ast);

    this.initialization = new ForStatementInitialization(
      ast.initialization,
      options
    );
    this.condition = new ForStatementCondition(ast.condition, options);
    if (ast.iterator) {
      this.iterator = new Expression(ast.iterator, options);
    }
    this.body = new Statement(ast.body, options);

    this.updateMetadata(
      this.initialization,
      this.condition,
      this.iterator,
      this.body
    );
  }

  print(path: AstPath<ForStatement>, print: PrintFunction): Doc {
    const initialization = printVariant('initialization', path, print);
    const condition = printVariant('condition', path, print);
    const iterator = printVariant('iterator', path, print);

    return [
      'for (',
      printSeparatedList([initialization, condition, iterator], {
        separator:
          initialization !== ';' || condition !== ';' || iterator !== ''
            ? line
            : ''
      }),
      ')',
      printIndentedGroupOrSpacedDocument(
        printVariant('body', path, print),
        this.body.variant.kind !== NonterminalKind.Block
      )
    ];
  }
}
