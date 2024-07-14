import { SlangNode } from './SlangNode.js';

export class EnumDefinition extends SlangNode {
  enumKeyword;

  name;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, parse) {
    super(ast, offset);
    this.parseChildrenNodes(ast, parse);
    this.initializeLoc(ast);
  }

  print(path, print) {
    return [
      `${this.enumKeyword} ${this.name} ${this.openBrace}`,
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
