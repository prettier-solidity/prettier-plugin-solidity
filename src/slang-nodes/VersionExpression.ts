import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { VersionRange } from './VersionRange.js';
import { VersionTerm } from './VersionTerm.js';

import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

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
