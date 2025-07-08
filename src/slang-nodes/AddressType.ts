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
    [this.loc, this.comments] = getNodeMetadata(ast);

    this.payableKeyword = ast.payableKeyword?.unparse();
  }

  print(): Doc {
    return joinExisting(' ', ['address', this.payableKeyword]);
  }
}
