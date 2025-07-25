import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { VersionRange } from './VersionRange.js';
import { VersionTerm } from './VersionTerm.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.VersionExpression['variant']
): VersionExpression['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.VersionRange:
      return new VersionRange(variant as ast.VersionRange);
    case NonterminalKind.VersionTerm:
      return new VersionTerm(variant as ast.VersionTerm);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

export class VersionExpression extends SlangNode {
  readonly kind = NonterminalKind.VersionExpression;

  variant: VersionRange | VersionTerm;

  constructor(ast: ast.VersionExpression) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<VersionExpression>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
