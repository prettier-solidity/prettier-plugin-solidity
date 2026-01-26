import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { VersionRange } from './VersionRange.js';
import { VersionTerm } from './VersionTerm.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.ts';

function createNonterminalVariant(
  variant: ast.VersionExpression['variant'],
  options: ParserOptions<AstNode>
): VersionExpression['variant'] {
  if (variant instanceof ast.VersionRange) {
    return new VersionRange(variant, options);
  }
  if (variant instanceof ast.VersionTerm) {
    return new VersionTerm(variant, options);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class VersionExpression extends SlangNode {
  readonly kind = NonterminalKind.VersionExpression;

  variant: VersionRange | VersionTerm;

  constructor(ast: ast.VersionExpression, options: ParserOptions<AstNode>) {
    super(ast, options);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
