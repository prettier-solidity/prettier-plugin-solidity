import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulEqualAndColon } from './YulEqualAndColon.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class YulStackAssignmentOperator implements SlangNode {
  readonly kind = NonterminalKind.YulStackAssignmentOperator;

  comments;

  loc;

  variant: YulEqualAndColon | string;

  constructor(ast: ast.YulStackAssignmentOperator) {
    let metadata = getNodeMetadata(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.text
        : new YulEqualAndColon(ast.variant);

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
