import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { extractVariant } from '../slang-utils/extract-variant.ts';
import { isBlockComment } from '../slang-utils/is-comment.ts';
import { hardline } from '../slang-printers/prettier-builders.ts';
import { printComments } from '../slang-printers/print-comments.ts';
import { SlangNode } from './SlangNode.ts';
import { TupleMember } from './TupleMember.ts';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

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

  print(
    print: PrintFunction,
    path: AstPath<TupleDeconstructionElement>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    if (this.member) {
      return print('member');
    }

    const lastComment = this.comments?.at(-1);
    return [
      printComments(this, path, options),
      // A line comment would swallow the separator that follows the slot.
      lastComment && !isBlockComment(lastComment) && !path.isLast
        ? hardline
        : ''
    ];
  }
}
