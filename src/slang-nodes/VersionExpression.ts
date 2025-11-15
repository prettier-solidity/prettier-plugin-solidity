import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
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
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class VersionExpression extends SlangNode {
  readonly kind = NonterminalKind.VersionExpression;

  variant: VersionRange | VersionTerm;

  constructor(ast: ast.VersionExpression) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant);

    this.updateMetadata(this.variant);
  }
}
