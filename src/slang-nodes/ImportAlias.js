import { SlangNode } from './SlangNode.js';

export class ImportAlias extends SlangNode {
  asKeyword;

  identifier;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => {
      const { asKeyword, identifier } = ast;
      this.asKeyword = asKeyword.text;
      this.identifier = identifier.text;
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print() {
    return ` ${this.asKeyword} ${this.identifier}`;
  }
}
