import { SlangNode } from './SlangNode.js';

export class AddressType extends SlangNode {
  addressKeyword;

  payableKeyword;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print() {
    return `${this.addressKeyword}${this.payableKeyword ? ` ${this.payableKeyword}` : ''}`;
  }
}
