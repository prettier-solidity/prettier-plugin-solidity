import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulEqualAndColon } from './YulEqualAndColon.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulStackAssignmentOperator implements SlangNode {
  readonly kind = NonterminalKind.YulStackAssignmentOperator;

  comments;

  loc;

  variant: YulEqualAndColon | string;

  constructor(ast: ast.YulStackAssignmentOperator, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.unparse()
        : new YulEqualAndColon(ast.variant, offsets[0]);

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulStackAssignmentOperator>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
