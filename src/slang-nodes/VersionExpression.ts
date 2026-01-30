import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { VersionRange } from './VersionRange.js';
import { VersionTerm } from './VersionTerm.js';

import type { CollectedMetadata } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.VersionExpression['variant'],
  collected: CollectedMetadata
): VersionExpression['variant'] {
  if (variant instanceof ast.VersionRange) {
    return new VersionRange(variant, collected);
  }
  if (variant instanceof ast.VersionTerm) {
    return new VersionTerm(variant, collected);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class VersionExpression extends SlangNode {
  readonly kind = NonterminalKind.VersionExpression;

  variant: VersionRange | VersionTerm;

  constructor(ast: ast.VersionExpression, collected: CollectedMetadata) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected);

    this.updateMetadata(this.variant);
  }
}
