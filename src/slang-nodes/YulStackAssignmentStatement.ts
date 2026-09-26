import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { line } from '../slang-printers/prettier-builders.ts';
import { printSeparatedItem } from '../slang-printers/print-separated-item.ts';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { YulStackAssignmentOperator } from './YulStackAssignmentOperator.ts';
import { TerminalNode } from './TerminalNode.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class YulStackAssignmentStatement extends SlangNode {
  readonly kind = NonterminalKind.YulStackAssignmentStatement;

  assignment: YulStackAssignmentOperator['variant'];

  variable: TerminalNode;

  constructor(
    ast: ast.YulStackAssignmentStatement,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    this.assignment = extractVariant(
      new YulStackAssignmentOperator(ast.assignment, collected)
    );
    this.variable = new TerminalNode(ast.variable, collected);

    this.updateMetadata(this.assignment);
  }

  print(print: PrintFunction): Doc {
    return [
      print('assignment'),
      printSeparatedItem(print('variable'), {
        firstSeparator: line,
        lastSeparator: ''
      })
    ];
  }
}
