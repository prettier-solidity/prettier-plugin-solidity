import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { TerminalNode } from '@nomicfoundation/slang/cst/index.js';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionRange } from './VersionRange.js';
import { VersionComparator } from './VersionComparator.js';
import { VersionSpecifiers } from './VersionSpecifiers.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types';

export class VersionExpression implements SlangNode {
  readonly kind = NonterminalKind.VersionExpression;

  comments;

  loc;

  variant: VersionRange | VersionComparator | VersionSpecifiers | string;

  constructor(ast: ast.VersionExpression) {
    let metadata = getNodeMetadata(ast);

    if (ast.variant instanceof TerminalNode) {
      // TODO: test whether this is a Identifier
      this.variant = ast.variant.text;
    } else {
      switch (ast.variant.cst.kind) {
        case NonterminalKind.VersionRange:
          this.variant = new VersionRange(ast.variant as ast.VersionRange);
          break;
        case NonterminalKind.VersionComparator:
          this.variant = new VersionComparator(
            ast.variant as ast.VersionComparator
          );
          break;
        case NonterminalKind.VersionSpecifiers:
          this.variant = new VersionSpecifiers(
            ast.variant as ast.VersionSpecifiers
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

  print(path: AstPath<VersionExpression>, print: PrintFunction): Doc {
    return typeof this.variant === 'string'
      ? this.variant
      : path.call(print, 'variant');
  }
}
