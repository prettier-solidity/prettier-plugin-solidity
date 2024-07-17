import { SlangNode } from './SlangNode.js';

export class ABICoderPragma extends SlangNode {
  abicoderKeyword;

  version;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => ({
      abicoderKeyword: ast.abicoderKeyword.text,
      version: ast.version.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return `${this.abicoderKeyword} ${this.version}`;
  }
}
