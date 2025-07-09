import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { VersionRange } from './VersionRange.js';
import { VersionTerm } from './VersionTerm.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc } from 'prettier';
import type { PrintFunction } from '../types.d.ts';

export class VersionExpression extends SlangNode {
  readonly kind = NonterminalKind.VersionExpression;

  variant: VersionRange | VersionTerm;

  constructor(ast: ast.VersionExpression) {
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.VersionRange:
        this.variant = new VersionRange(variant as ast.VersionRange);
        break;
      case NonterminalKind.VersionTerm:
        this.variant = new VersionTerm(variant as ast.VersionTerm);
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<VersionExpression>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
