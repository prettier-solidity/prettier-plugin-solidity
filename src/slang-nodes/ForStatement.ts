import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedList } from '../slang-printers/print-separated-list.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { StatementWithIndentedBody } from './StatementWithIndentedBody.js';
import { ForStatementInitialization } from './ForStatementInitialization.js';
import { ForStatementCondition } from './ForStatementCondition.js';
import { Expression } from './Expression.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class ForStatement extends StatementWithIndentedBody {
  readonly kind = NonterminalKind.ForStatement;

  initialization: ForStatementInitialization['variant'];

  condition: ForStatementCondition['variant'];

  iterator?: Expression['variant'];

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
      this.printBody(print)
    ];
  }
}
