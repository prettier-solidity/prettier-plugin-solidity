import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { VersionRange } from './VersionRange.js';
import { VersionTerm } from './VersionTerm.js';

import type { CollectedMetadata } from '../types.d.ts';

const variantConstructors = {
  [ast.VersionRange.name]: VersionRange,
  [ast.VersionTerm.name]: VersionTerm
};

function createNonterminalVariant(
  variant: ast.VersionExpression['variant'],
  collected: CollectedMetadata
): VersionExpression['variant'] {
  const variantConstructor = variantConstructors[variant.constructor.name];
  if (variantConstructor !== undefined)
    return new variantConstructor(variant as never, collected);

  throw new Error(`Unexpected variant: ${JSON.stringify(variant)}`);
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
