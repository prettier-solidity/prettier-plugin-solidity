import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { printVariant } from '../slang-printers/print-variant.js';
import { SlangNode } from './SlangNode.js';
import { YulEqualAndColon } from './YulEqualAndColon.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class YulStackAssignmentOperator extends SlangNode {
  readonly kind = NonterminalKind.YulStackAssignmentOperator;

  variant: YulEqualAndColon | string;

  constructor(ast: ast.YulStackAssignmentOperator) {
    super(ast);

    const variant = ast.variant;
    if (variant instanceof TerminalNode) {
      this.variant = variant.unparse();
      return;
    }
    this.variant = new YulEqualAndColon(variant);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<YulStackAssignmentOperator>, print: PrintFunction): Doc {
    return printVariant(this, path, print);
  }
}
