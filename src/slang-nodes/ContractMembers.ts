import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { VariantCollection } from './VariantCollection.js';
import { ContractMember } from './ContractMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class ContractMembers extends VariantCollection<
  ast.ContractMembers,
  ContractMember
> {
  readonly kind = NonterminalKind.ContractMembers;

  constructor(ast: ast.ContractMembers, collected: CollectedMetadata) {
    super(ast, collected, ContractMember);
  }

  print(
    print: PrintFunction,
    path: AstPath<ContractMembers>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printIndentedPreservingEmptyLines(this, path, print, options);
  }
}
