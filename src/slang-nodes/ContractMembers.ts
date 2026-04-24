import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { LineCollection } from './LineCollection.js';
import { ContractMember } from './ContractMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class ContractMembers extends LineCollection<
  ast.ContractMembers,
  ContractMember
> {
  readonly kind = NonterminalKind.ContractMembers;

  constructor(ast: ast.ContractMembers, collected: CollectedMetadata) {
    super(ast, collected, ContractMember);
  }
}
