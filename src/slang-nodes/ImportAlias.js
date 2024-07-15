import { SlangNode } from './SlangNode.js';

export class ImportAlias extends SlangNode {
  asKeyword;

  identifier;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print() {
    return ` ${this.asKeyword} ${this.identifier}`;
  }
}
