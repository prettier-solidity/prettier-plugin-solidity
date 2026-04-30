import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { printIndentedGroupOrSpacedDocument } from '../slang-printers/print-indented-group-or-spaced-document.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { Expression } from './Expression.js';
import { Statement } from './Statement.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class WhileStatement extends SlangNode {
  readonly kind = NonterminalKind.WhileStatement;

  condition: Expression['variant'];

  body: Statement['variant'];

  constructor(ast: ast.WhileStatement, collected: CollectedMetadata) {
    super(ast, collected);

    this.condition = extractVariant(new Expression(ast.condition, collected));
    this.body = extractVariant(new Statement(ast.body, collected));

    this.updateMetadata(this.condition, this.body);
  }

  print(print: PrintFunction): Doc {
    return [
      'while (',
      printSeparatedItem(print('condition')),
      ')',
      printIndentedGroupOrSpacedDocument(
        print('body'),
        this.body.kind !== NonterminalKind.Block
      )
    ];
  }
}
