import { NonterminalKind } from '@nomicfoundation/slang/kinds/index.js';
import { SlangNode } from './SlangNode.js';

export class AddressType extends SlangNode {
  get kind() {
    return NonterminalKind.AddressType;
  }

  addressKeyword;

  payableKeyword;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      addressKeyword: ast.addressKeyword.text,
      payableKeyword: ast.payableKeyword?.text
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return `${this.addressKeyword}${this.payableKeyword ? ` ${this.payableKeyword}` : ''}`;
  }
}
