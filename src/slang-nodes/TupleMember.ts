import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { TypedTupleMember } from './TypedTupleMember.js';
import { UntypedTupleMember } from './UntypedTupleMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { AstNode } from './types.d.ts';
import type { PrintFunction } from '../types.d.ts';

function createNonterminalVariant(
  variant: ast.TupleMember['variant'],
  options: ParserOptions<AstNode>
): TupleMember['variant'] {
  switch (variant.cst.kind) {
    case NonterminalKind.TypedTupleMember:
      return new TypedTupleMember(variant as ast.TypedTupleMember, options);
    case NonterminalKind.UntypedTupleMember:
      return new UntypedTupleMember(variant as ast.UntypedTupleMember);
    default:
      throw new Error(`Unexpected variant: ${variant.cst.kind}`);
  }
}

export class TupleMember extends SlangNode {
  readonly kind = NonterminalKind.TupleMember;

  variant: TypedTupleMember | UntypedTupleMember;

  constructor(ast: ast.TupleMember, options: ParserOptions<AstNode>) {
    super(ast);

    this.variant = createNonterminalVariant(ast.variant, options);

    this.updateMetadata(this.variant);
  }

  print(path: AstPath<TupleMember>, print: PrintFunction): Doc {
    return path.call(print, 'variant');
  }
}
