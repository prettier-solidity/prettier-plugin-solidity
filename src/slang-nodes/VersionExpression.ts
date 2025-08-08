import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { VersionRange } from './VersionRange.js';
import { VersionTerm } from './VersionTerm.js';

function createNonterminalVariant(
  variant: ast.VersionExpression['variant']
): VersionExpression['variant'] {
  if (variant instanceof ast.VersionRange) {
    return new VersionRange(variant);
  }
  if (variant instanceof ast.VersionTerm) {
    return new VersionTerm(variant);
  }
  const exhaustiveCheck: never = variant;
  return exhaustiveCheck;
}

export class VersionExpression extends PolymorphicNode {
  readonly kind = NonterminalKind.VersionExpression;

  variant: VersionRange | VersionTerm;

  constructor(ast: ast.VersionExpression) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant);

    this.updateMetadata(this.variant);
  }
}
