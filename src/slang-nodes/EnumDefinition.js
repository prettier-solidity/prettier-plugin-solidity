import { SlangNode } from './SlangNode.js';
import { EnumMembers } from './EnumMembers.js';

export class EnumDefinition extends SlangNode {
  enumKeyword;

  name;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      enumKeyword: ast.enumKeyword.text,
      name: ast.name.text,
      openBrace: ast.openBrace.text,
      members: new EnumMembers(ast.members, childrenOffsets.shift(), options),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.enumKeyword} ${this.name} ${this.openBrace}`,
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
