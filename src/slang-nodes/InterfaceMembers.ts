import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { LineCollection } from './LineCollection.js';
import { ContractMember } from './ContractMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class InterfaceMembers extends LineCollection<
  ast.InterfaceMembers,
  ContractMember
> {
  readonly kind = NonterminalKind.InterfaceMembers;

  constructor(ast: ast.InterfaceMembers, collected: CollectedMetadata) {
    super(ast, collected, ContractMember);
  }
}
