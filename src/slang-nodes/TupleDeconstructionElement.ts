import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TupleMember } from './TupleMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class TupleDeconstructionElement extends SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionElement;

  member?: TupleMember['variant'];

  constructor(
    ast: ast.TupleDeconstructionElement,
    collected: CollectedMetadata,
    options: ParserOptions<PrintableNode>
  ) {
    super(ast, collected);

    if (ast.member) {
      this.member = extractVariant(
        new TupleMember(ast.member, collected, options)
      );
    }

    this.updateMetadata(this.member);
  }

  print(print: PrintFunction): Doc {
    return this.member ? print('member') : '';
  }
}
