import { NonterminalKind, TerminalNode } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { YulColonAndEqual } from './YulColonAndEqual.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class YulAssignmentOperator implements SlangNode {
  readonly kind = NonterminalKind.YulAssignmentOperator;

  comments;

  loc;

  variant: YulColonAndEqual | string;

  constructor(ast: ast.YulAssignmentOperator) {
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.variant =
      ast.variant instanceof TerminalNode
        ? ast.variant.unparse()
        : new YulColonAndEqual(ast.variant);

    updateMetadata(
      this.loc,
      this.comments,
      typeof this.variant === 'string' ? [] : [this.variant]
    );
  }

  print(path: AstPath<YulAssignmentOperator>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
