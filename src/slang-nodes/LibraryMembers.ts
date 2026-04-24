import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { LineCollection } from './LineCollection.js';
import { ContractMember } from './ContractMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class LibraryMembers extends LineCollection<
  ast.LibraryMembers,
  ContractMember
> {
  readonly kind = NonterminalKind.LibraryMembers;

  constructor(ast: ast.LibraryMembers, collected: CollectedMetadata) {
    super(ast, collected, ContractMember);
  }
}
