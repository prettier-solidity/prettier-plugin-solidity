import { SlangNode } from './SlangNode.js';

export class ImportAlias extends SlangNode {
  asKeyword;

  identifier;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print() {
    return ` ${this.asKeyword} ${this.identifier}`;
  }
}
