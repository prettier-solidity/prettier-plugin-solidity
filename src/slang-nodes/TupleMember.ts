import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { TypedTupleMember } from './TypedTupleMember.js';
import { UntypedTupleMember } from './UntypedTupleMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

export class TupleMember extends PolymorphicNode {
  readonly kind = NonterminalKind.TupleMember;

  variant: TypedTupleMember | UntypedTupleMember;

  constructor(ast: ast.TupleMember, options: ParserOptions<AstNode>) {
    super(ast);

    const variant = ast.variant;
    const variantKind = variant.cst.kind;
    switch (variantKind) {
      case NonterminalKind.TypedTupleMember:
        this.variant = new TypedTupleMember(
          variant as ast.TypedTupleMember,
          options
        );
        break;
      case NonterminalKind.UntypedTupleMember:
        this.variant = new UntypedTupleMember(
          variant as ast.UntypedTupleMember
        );
        break;
      default:
        throw new Error(`Unexpected variant: ${variantKind}`);
    }

    this.updateMetadata(this.variant);
  }
}
