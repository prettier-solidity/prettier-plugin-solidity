const { NonterminalKind } = await import('@nomicfoundation/slang/cst');
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { SlangNode } from './SlangNode.js';
import { YulStackAssignmentOperator } from './YulStackAssignmentOperator.js';
import { YulIdentifier } from './YulIdentifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

const { line } = doc.builders;

export class YulStackAssignmentStatement extends SlangNode {
  readonly kind = NonterminalKind.YulStackAssignmentStatement;

  assignment: YulStackAssignmentOperator;

  variable: YulIdentifier;

  constructor(ast: ast.YulStackAssignmentStatement) {
    super(ast);

    this.assignment = new YulStackAssignmentOperator(ast.assignment);
    this.variable = new YulIdentifier(ast.variable);

    this.updateMetadata(this.assignment);
  }

  print(path: AstPath<YulStackAssignmentStatement>, print: PrintFunction): Doc {
    return [
      path.call(print, 'assignment'),
      printSeparatedItem(path.call(print, 'variable'), {
        firstSeparator: line,
        lastSeparator: ''
      })
    ];
  }
}
