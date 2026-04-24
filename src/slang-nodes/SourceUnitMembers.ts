import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { LineCollection } from './LineCollection.js';
import { SourceUnitMember } from './SourceUnitMember.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { CollectedMetadata } from '../types.d.ts';

export class SourceUnitMembers extends LineCollection<
  ast.SourceUnitMembers,
  SourceUnitMember
> {
  readonly kind = NonterminalKind.SourceUnitMembers;

  constructor(ast: ast.SourceUnitMembers, collected: CollectedMetadata) {
    super(ast, collected, SourceUnitMember, false);
  }
}
