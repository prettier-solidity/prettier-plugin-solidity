import { SlangNode } from './SlangNode.js';

export class ABICoderPragma extends SlangNode {
  abicoderKeyword;

  version;

  constructor(ast, offset) {
    super();

    const fetch = () => ({
      abicoderKeyword: ast.abicoderKeyword.text,
      version: ast.version.text
    });

    this.initialize(ast, offset, fetch);
  }

  print() {
    return `${this.abicoderKeyword} ${this.version}`;
  }
}
