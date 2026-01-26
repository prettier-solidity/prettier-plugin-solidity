import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { doc } from 'prettier';
import { printSeparatedItem } from '../slang-printers/print-separated-item.js';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulStackAssignmentOperator } from './YulStackAssignmentOperator.js';
import { TerminalNode } from './TerminalNode.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.ts';

const { line } = doc.builders;

export class YulStackAssignmentStatement extends SlangNode {
  readonly kind = NonterminalKind.YulStackAssignmentStatement;

  assignment: YulStackAssignmentOperator['variant'];

  variable: TerminalNode;

  constructor(
    ast: ast.YulStackAssignmentStatement,
    options: ParserOptions<AstNode>
  ) {
    super(ast, options);

    this.assignment = extractVariant(
      new YulStackAssignmentOperator(ast.assignment, options)
    );
    this.variable = new TerminalNode(ast.variable, options);

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
