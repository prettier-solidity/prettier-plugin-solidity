import { SlangNode } from './SlangNode.js';
import { EnumMembers } from './EnumMembers.js';

export class EnumDefinition extends SlangNode {
  enumKeyword;

  name;

  openBrace;

  members;

  closeBrace;

  constructor(ast, offset, comments, options) {
    super();

    const fetch = (childrenOffsets) => {
      const { enumKeyword, name, openBrace, members, closeBrace } = ast;
      this.enumKeyword = enumKeyword.text;
      this.name = name.text;
      this.openBrace = openBrace.text;
      this.members = new EnumMembers(
        members,
        childrenOffsets.shift(),
        comments,
        options
      );
      this.closeBrace = closeBrace.text;
    };

    this.initialize(ast, offset, comments, fetch);
  }

  print(path, print) {
    return [
      `${this.enumKeyword} ${this.name} ${this.openBrace}`,
      path.call(print, 'members'),
      this.closeBrace
    ];
  }
}
