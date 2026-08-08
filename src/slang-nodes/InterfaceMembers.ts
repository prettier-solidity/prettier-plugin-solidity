import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { printIndentedPreservingEmptyLines } from '../slang-printers/print-preserving-empty-lines.js';
import { VariantCollection } from './VariantCollection.js';
import { ContractMember } from './ContractMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { AstPath, Doc, ParserOptions } from 'prettier';
import type { CollectedMetadata, PrintFunction } from '../types.d.ts';
import type { PrintableNode } from './types.d.ts';

export class InterfaceMembers extends VariantCollection<
  ast.InterfaceMembers,
  ContractMember
> {
  readonly kind = NonterminalKind.InterfaceMembers;

  constructor(ast: ast.InterfaceMembers, collected: CollectedMetadata) {
    super(ast, collected, ContractMember);
  }

  print(
    print: PrintFunction,
    path: AstPath<InterfaceMembers>,
    options: ParserOptions<PrintableNode>
  ): Doc {
    return printIndentedPreservingEmptyLines(this, path, print, options);
  }
}
