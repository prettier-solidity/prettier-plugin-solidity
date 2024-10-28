import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { getNodeMetadata } from '../slang-utils/metadata.js';
import { joinExisting } from '../slang-utils/join-existing.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types.d.ts';

export class AddressType implements SlangNode {
  readonly kind = NonterminalKind.AddressType;

  comments;

  loc;

  payableKeyword?: string;

  constructor(ast: ast.AddressType) {
    const metadata = getNodeMetadata(ast);

    this.payableKeyword = ast.payableKeyword?.unparse();

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return joinExisting(' ', ['address', this.payableKeyword]);
  }
}
