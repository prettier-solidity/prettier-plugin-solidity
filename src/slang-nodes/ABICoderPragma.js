import { SlangNode } from './SlangNode.js';

export class ABICoderPragma extends SlangNode {
  abicoderKeyword;

  version;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print() {
    return `${this.abicoderKeyword} ${this.version}`;
  }
}
