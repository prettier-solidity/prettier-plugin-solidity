import * as ast from '@nomicfoundation/slang/ast';
import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TypedTupleMember } from './TypedTupleMember.js';
import { UntypedTupleMember } from './UntypedTupleMember.js';

import type { ParserOptions } from 'prettier';
import type { CollectedMetadata } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

function createNonterminalVariant(
  variant: ast.TupleMember['variant'],
  collected: CollectedMetadata,
  options: ParserOptions<AstNode>
): TupleMember['variant'] {
  if (variant instanceof ast.TypedTupleMember) {
    return new TypedTupleMember(variant, collected, options);
  }
  if (variant instanceof ast.UntypedTupleMember) {
    return new UntypedTupleMember(variant, collected);
  }
  const exhaustiveCheck: never = variant;
  throw new Error(`Unexpected variant: ${JSON.stringify(exhaustiveCheck)}`);
}

export class TupleMember extends SlangNode {
  readonly kind = NonterminalKind.TupleMember;

  variant: TypedTupleMember | UntypedTupleMember;

  constructor(
    ast: ast.TupleMember,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    this.variant = createNonterminalVariant(ast.variant, collected, options);

    this.updateMetadata(this.variant);
  }
}
