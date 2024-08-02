import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { getNodeMetadata } from '../slang-utils/metadata.js';

import type * as ast from '@nomicfoundation/slang/ast';
import type { Doc } from 'prettier';
import type { SlangNode } from '../types';

export class AddressType implements SlangNode {
  readonly kind = NonterminalKind.AddressType;

  comments;

  loc;

  addressKeyword: string;

  payableKeyword?: string;

  constructor(ast: ast.AddressType, offset: number) {
    const metadata = getNodeMetadata(ast, offset);

    this.addressKeyword = ast.addressKeyword.text;
    this.payableKeyword = ast.payableKeyword?.text;

    this.comments = metadata.comments;
    this.loc = metadata.loc;
  }

  print(): Doc {
    return `${this.addressKeyword}${this.payableKeyword ? ` ${this.payableKeyword}` : ''}`;
  }
}
