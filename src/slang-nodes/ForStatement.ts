import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { ForStatementInitialization } from './ForStatementInitialization.js';
import { ForStatementCondition } from './ForStatementCondition.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class ForStatement extends SlangNode {
  readonly kind = NonterminalKind.ForStatement;

  initialization: ForStatementInitialization['variant'];

  condition: ForStatementCondition['variant'];

  iterator?: Expression['variant'];

  body: Statement['variant'];

  constructor(ast: ast.ForStatement, collected: CollectedMetadata) {
    super(ast, collected);

    this.initialization = extractVariant(
      new ForStatementInitialization(ast.initialization, collected)
    );
    this.condition = extractVariant(
      new ForStatementCondition(ast.condition, collected)
    );
    if (ast.iterator) {
      this.iterator = extractVariant(new Expression(ast.iterator, collected));
    }
    this.body = extractVariant(new Statement(ast.body, collected));

    this.updateMetadata(
      this.initialization,
      this.condition,
      this.iterator,
      this.body
    );
  }

  print(print: PrintFunction): Doc {
    const initialization = print('initialization');
    const condition = print('condition');
    const iterator = print('iterator');

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
        print('body'),
        this.body.kind !== NonterminalKind.Block
      )
    ];
  }
}
