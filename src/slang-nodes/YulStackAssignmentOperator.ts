const { NonterminalKind, TerminalNode } = await import(
  '@nomicfoundation/slang/cst'
);
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

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.unparse()
        : new YulEqualAndColon(ast.variant);

    if (typeof this.variant !== 'string') this.updateMetadata(this.variant);
  }

  print(path: AstPath<YulStackAssignmentOperator>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
