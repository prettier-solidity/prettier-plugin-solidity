import { SlangNode } from './SlangNode.js';

export class ABICoderPragma extends SlangNode {
  abicoderKeyword;

  version;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => {
      const { abicoderKeyword, version } = ast;
      this.abicoderKeyword = abicoderKeyword.text;
      this.version = version.text;
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print() {
    return `${this.abicoderKeyword} ${this.version}`;
  }
}
