import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { VariantCollection } from './VariantCollection.js';
import { SourceUnitMember } from './SourceUnitMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class SourceUnitMembers extends VariantCollection<
  ast.SourceUnitMembers,
  SourceUnitMember
> {
  readonly kind = NonterminalKind.SourceUnitMembers;

  constructor(ast: ast.SourceUnitMembers, collected: CollectedMetadata) {
    super(ast, collected, SourceUnitMember);
  }

  print(
    print: PrintFunction,
    path: AstPath<SourceUnitMembers>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printPreservingEmptyLines(this, path, print, options);
  }
}
