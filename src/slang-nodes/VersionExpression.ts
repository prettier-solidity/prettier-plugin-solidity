import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionRange } from './VersionRange.js';
import { VersionComparator } from './VersionComparator.js';
import { VersionSpecifiers } from './VersionSpecifiers.js';

import type * as ast from '@nomicfoundation/slang/ast/index.js';
import type { AstPath, Doc } from 'prettier';
import type { AstNode, SlangNode } from '../types.js';

export class VersionExpression implements SlangNode {
  readonly kind = NonterminalKind.VersionExpression;

  comments;

  loc;

  variant: VersionRange | VersionComparator | VersionSpecifiers | string;

  constructor(ast: ast.VersionExpression, offset: number) {
    let metadata = getNodeMetadata(ast, offset);
    const { offsets } = metadata;

    if (ast.variant instanceof TerminalNode) {
      this.variant = ast.variant.text;
    } else {
      switch (ast.variant.cst.kind) {
        case NonterminalKind.VersionRange:
          this.variant = new VersionRange(
            ast.variant as ast.VersionRange,
            offsets[0]
          );
          break;
        case NonterminalKind.VersionComparator:
          this.variant = new VersionComparator(
            ast.variant as ast.VersionComparator,
            offsets[0]
          );
          break;
        case NonterminalKind.VersionSpecifiers:
          this.variant = new VersionSpecifiers(
            ast.variant as ast.VersionSpecifiers,
            offsets[0]
          );
          break;
        default:
          throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
      }
    }

    metadata = updateMetadata(
      metadata,
      typeof this.variant === 'string' ? [] : [this.variant]
    );

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(
    path: AstPath<VersionExpression>,
    print: (path: AstPath<AstNode | string>) => Doc
  ): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
