import { SlangNode } from './SlangNode.js';

export class ErrorDefinition extends SlangNode {
  errorKeyword;

  name;

  members;

  semicolon;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      `${this.errorKeyword} ${this.name}`,
      path.call(print, 'members'),
      this.semicolon
    ];
  }
}
