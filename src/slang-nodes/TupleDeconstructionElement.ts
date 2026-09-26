import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { SlangNode } from './SlangNode.ts';
import { TupleMember } from './TupleMember.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';

export class TupleDeconstructionElement extends SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionElement;

  member?: TupleMember['variant'];

  constructor(
    ast: ast.TupleDeconstructionElement,
    collected: CollectedMetadata
  ) {
    super(ast, collected);

    if (ast.member) {
      this.member = extractVariant(new TupleMember(ast.member, collected));
    }

    this.updateMetadata(this.member);
  }

  print(print: PrintFunction): Doc {
    return print('member');
  }
}
