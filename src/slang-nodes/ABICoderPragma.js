import { SlangNode } from './SlangNode.js';

export class ABICoderPragma extends SlangNode {
  abicoderKeyword;

  version;

  constructor(ast, offset) {
    super(ast, offset);
    this.abicoderKeyword = ast.abicoderKeyword.text;
    this.version = ast.version.text;
    this.initiateLoc(ast);
  }

  print() {
    return `${this.abicoderKeyword} ${this.version}`;
  }
}
