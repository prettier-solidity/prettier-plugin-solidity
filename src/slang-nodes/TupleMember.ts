import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { PolymorphicNode } from './PolymorphicNode.js';
import { TypedTupleMember } from './TypedTupleMember.js';
import { UntypedTupleMember } from './UntypedTupleMember.js';

import type { ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.TupleMember['variant'],
  options: ParserOptions<AstNode>
): TupleMember['variant'] {
  if (variant instanceof ast.TypedTupleMember) {
    return new TypedTupleMember(variant, options);
  }
  if (variant instanceof ast.UntypedTupleMember) {
    return new UntypedTupleMember(variant);
  }
  const exhaustiveCheck: never = variant;
  return exhaustiveCheck;
}

export class TupleMember extends PolymorphicNode {
  readonly kind = NonterminalKind.TupleMember;

  variant: TypedTupleMember | UntypedTupleMember;

  constructor(ast: ast.TupleMember, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }
}
