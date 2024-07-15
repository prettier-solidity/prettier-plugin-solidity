import { SlangNode } from './SlangNode.js';

export class ABICoderPragma extends SlangNode {
  abicoderKeyword;

  version;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print() {
    return `${this.abicoderKeyword} ${this.version}`;
  }
}
