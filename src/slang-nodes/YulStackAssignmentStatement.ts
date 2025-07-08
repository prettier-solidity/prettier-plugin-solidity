import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { YulStackAssignmentOperator } from './YulStackAssignmentOperator.js';
import { YulIdentifier } from './YulIdentifier.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

const { line } = doc.builders;

export class YulStackAssignmentStatement implements SlangNode {
  readonly kind = NonterminalKind.YulStackAssignmentStatement;

  comments;

  loc;

  assignment: YulStackAssignmentOperator;

  variable: YulIdentifier;

  constructor(ast: ast.YulStackAssignmentStatement) {
    const metadata = getNodeMetadata(ast);

    this.assignment = new YulStackAssignmentOperator(ast.assignment);
    this.variable = new YulIdentifier(ast.variable);

    [this.loc, this.comments] = updateMetadata(metadata, [this.assignment]);
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
