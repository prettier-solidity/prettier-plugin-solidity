import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { VariantCollection } from './VariantCollection.js';
import { ContractMember } from './ContractMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class LibraryMembers extends VariantCollection<
  ast.LibraryMembers,
  ContractMember
> {
  readonly kind = NonterminalKind.LibraryMembers;

  constructor(ast: ast.LibraryMembers, collected: CollectedMetadata) {
    super(ast, collected, ContractMember);
  }

  print(
    print: PrintFunction,
    path: AstPath<LibraryMembers>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printIndentedPreservingEmptyLines(this, path, print, options);
  }
}
