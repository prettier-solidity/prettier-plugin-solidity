import { SlangNode } from './SlangNode.js';
import { StructMembers } from './StructMembers.js';

export class StructDefinition extends SlangNode {
  structKeyword;

  name;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, options) {
    super();

    const fetch = (childrenOffsets) => ({
      structKeyword: ast.structKeyword.text,
      name: ast.name.text,
      openBrace: ast.openBrace.text,
      members: new StructMembers(ast.members, childrenOffsets.shift(), options),
      closeBrace: ast.closeBrace.text
    });

    this.initialize(ast, offset, fetch);
  }

  print(path, print) {
    return [
      `${this.structKeyword} ${this.name} ${this.openBrace}`,
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
