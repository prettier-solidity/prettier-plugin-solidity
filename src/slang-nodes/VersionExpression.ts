import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata, updateMetadata } from '../slang-utils/metadata.js';
import { VersionRange } from './VersionRange.js';
import { VersionTerm } from './VersionTerm.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction, SlangNode } from '../types.d.ts';

export class VersionExpression implements SlangNode {
  readonly kind = NonterminalKind.VersionExpression;

  comments;

  loc;

  variant: VersionRange | VersionTerm;

  constructor(ast: ast.VersionExpression) {
    let metadata = getNodeMetadata(ast);

    switch (ast.variant.cst.kind) {
      case NonterminalKind.VersionRange:
        this.variant = new VersionRange(ast.variant as ast.VersionRange);
        break;
      case NonterminalKind.VersionTerm:
        this.variant = new VersionTerm(ast.variant as ast.VersionTerm);
        break;
      default:
        throw new Error(`Unexpected variant: ${ast.variant.cst.kind}`);
    }

    metadata = updateMetadata(metadata, [this.variant]);

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(path: AstPath<VersionExpression>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
