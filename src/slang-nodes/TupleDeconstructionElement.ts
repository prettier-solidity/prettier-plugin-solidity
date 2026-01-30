import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.js';
import { SlangNode } from './SlangNode.js';
import { TupleMember } from './TupleMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { AstNode } from './types.d.ts';

export class TupleDeconstructionElement extends SlangNode {
  readonly kind = NonterminalKind.TupleDeconstructionElement;

  member?: TupleMember['variant'];

  constructor(
    ast: ast.TupleDeconstructionElement,
    collected: CollectedMetadata,
    options: ParserOptions<AstNode>
  ) {
    super(ast, collected);

    if (ast.member) {
      this.member = extractVariant(
        new TupleMember(ast.member, collected, options)
      );
    }

    this.updateMetadata(this.member);
  }

  print(path: AstPath<TupleDeconstructionElement>, print: PrintFunction): Doc {
    return path.call(print, 'member');
  }
}
