import { SlangNode } from './SlangNode.js';

export class ImportAlias extends SlangNode {
  asKeyword;

  identifier;

  constructor(ast, offset, comments) {
    super();

    const fetch = () => ({
      asKeyword: ast.asKeyword.text,
      identifier: ast.identifier.text
    });

    this.initialize(ast, offset, fetch, comments);
  }

  print() {
    return ` ${this.asKeyword} ${this.identifier}`;
  }
}
