import { SlangNode } from './SlangNode.js';

export class StructDefinition extends SlangNode {
  structKeyword;

  name;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, comments, parse) {
    super(ast, offset, comments);
    this.initialize(ast, parse);
    this.finalize(ast);
  }

  print(path, print) {
    return [
      `${this.structKeyword} ${this.name} ${this.openBrace}`,
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
