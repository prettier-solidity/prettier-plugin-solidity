import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulColonAndEqual } from './YulColonAndEqual.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class YulAssignmentOperator implements SlangNode {
  readonly kind = NonterminalKind.YulAssignmentOperator;

  comments;

  loc;

  variant: YulColonAndEqual | string;

  constructor(ast: ast.YulAssignmentOperator, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.text
        : new YulColonAndEqual(ast.variant, offsets[0]);

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<YulAssignmentOperator>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
