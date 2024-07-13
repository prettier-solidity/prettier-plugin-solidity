import { SlangNode } from './SlangNode.js';

export class AddressType extends SlangNode {
  addressKeyword;

  payableKeyword;

  constructor(ast, offset) {
    super(ast, offset);
    this.addressKeyword = ast.addressKeyword.text;
    this.payableKeyword = ast.payableKeyword?.text;
    this.initiateLoc(ast);
  }

  print() {
    return `${this.addressKeyword}${this.payableKeyword ? ` ${this.payableKeyword}` : ''}`;
  }
}
