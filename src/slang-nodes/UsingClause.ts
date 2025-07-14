import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { IdentifierPath } from './IdentifierPath.js';
import { UsingDeconstruction } from './UsingDeconstruction.js';

import type * as ast from '@nomicfoundation/slang/ast';

export class UsingClause extends PolymorphicNode {
  readonly kind = NonterminalKind.UsingClause;

  variant: IdentifierPath | UsingDeconstruction;

  constructor(ast: ast.UsingClause) {
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.IdentifierPath:
        this.variant = new IdentifierPath(variant as ast.IdentifierPath);
        break;
      case NonterminalKind.UsingDeconstruction:
        this.variant = new UsingDeconstruction(
          variant as ast.UsingDeconstruction
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }
}
