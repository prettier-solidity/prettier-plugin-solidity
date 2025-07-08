import { NonterminalKind } from '@nomicfoundation/slang/cst';
import { SlangNode } from './SlangNode.js';
import { joinExisting } from '../slang-utils/join-existing.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';

export class AddressType extends SlangNode {
  readonly kind = NonterminalKind.AddressType;

  payableKeyword?: string;

  constructor(ast: ast.AddressType) {
    super(ast);

    this.payableKeyword = ast.payableKeyword?.unparse();
  }

  print(): Doc {
    return joinExisting(' ', ['address', this.payableKeyword]);
  }
}
