import { SlangNode } from './SlangNode.js';

export class EnumDefinition extends SlangNode {
  enumKeyword;

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
      `${this.enumKeyword} ${this.name} ${this.openBrace}`,
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
