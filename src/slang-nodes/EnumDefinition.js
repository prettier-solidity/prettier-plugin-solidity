import { SlangNode } from './SlangNode.js';

export class EnumDefinition extends SlangNode {
  enumKeyword;

  name;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, comments, parse) {
    super();
    this.initialize(ast, offset, comments, parse);
  }

  print(path, print) {
    return [
      `${this.enumKeyword} ${this.name} ${this.openBrace}`,
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
