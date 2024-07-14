import { SlangNode } from './SlangNode.js';

export class ABICoderPragma extends SlangNode {
  abicoderKeyword;

  version;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print() {
    return `${this.abicoderKeyword} ${this.version}`;
  }
}
