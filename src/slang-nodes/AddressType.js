import { SlangNode } from './SlangNode.js';

export class AddressType extends SlangNode {
  addressKeyword;

  payableKeyword;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print() {
    return `${this.addressKeyword}${this.payableKeyword ? ` ${this.payableKeyword}` : ''}`;
  }
}
